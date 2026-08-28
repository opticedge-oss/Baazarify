alter table public.tenants enable row level security;
alter table public.orders enable row level security;
alter table public.payment_transactions enable row level security;
alter table public.tenant_payment_settings enable row level security;

create policy "authenticated users can create tenants" on public.tenants
  for insert to authenticated with check (auth.uid() is not null);
create policy "public can view tenant identity" on public.tenants
  for select using (true);

-- Products are public only while active; merchant writes remain tenant-scoped.
alter table public.products enable row level security;
create policy "public can view active products" on public.products
  for select using (status = 'active');
create policy "merchants manage own products" on public.products
  for all using (
    exists (select 1 from public.merchants m where m.user_id = auth.uid() and m.tenant_id = products.tenant_id)
  ) with check (
    exists (select 1 from public.merchants m where m.user_id = auth.uid() and m.tenant_id = products.tenant_id)
  );

alter table public.product_variants enable row level security;
create policy "public can view active product variants" on public.product_variants
  for select using (
    exists (select 1 from public.products p where p.id = product_variants.product_id and p.status = 'active')
  );
create policy "merchants manage own product variants" on public.product_variants
  for all using (
    exists (
      select 1 from public.products p
      join public.merchants m on m.tenant_id = p.tenant_id
      where p.id = product_variants.product_id and m.user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.products p
      join public.merchants m on m.tenant_id = p.tenant_id
      where p.id = product_variants.product_id and m.user_id = auth.uid()
    )
  );

create policy "merchants view own orders" on public.orders
  for select using (exists (select 1 from public.merchants m where m.user_id = auth.uid() and m.tenant_id = orders.tenant_id));
create policy "merchants update own orders" on public.orders
  for update using (exists (select 1 from public.merchants m where m.user_id = auth.uid() and m.tenant_id = orders.tenant_id));

create policy "merchants view own transactions" on public.payment_transactions
  for select using (
    exists (
      select 1 from public.orders o
      join public.merchants m on m.tenant_id = o.tenant_id
      where o.id = payment_transactions.order_id and m.user_id = auth.uid()
    )
  );

create policy "merchants manage own payment settings" on public.tenant_payment_settings
  for all using (exists (select 1 from public.merchants m where m.user_id = auth.uid() and m.tenant_id = tenant_payment_settings.tenant_id))
  with check (exists (select 1 from public.merchants m where m.user_id = auth.uid() and m.tenant_id = tenant_payment_settings.tenant_id));

create or replace function public.reserve_product_inventory(p_tenant_id text, p_items jsonb)
returns void language plpgsql security definer set search_path = public as $$
declare
  item jsonb;
  changed_id uuid;
begin
  for item in select value from jsonb_array_elements(p_items)
  loop
    if item->>'variant_id' is not null then
      update public.product_variants variant
      set stock_quantity = stock_quantity - (item->>'quantity')::integer
      from public.products product
      where variant.id = (item->>'variant_id')::uuid
        and product.id = variant.product_id
        and product.tenant_id = p_tenant_id
        and product.status = 'active'
        and variant.stock_quantity >= (item->>'quantity')::integer
      returning variant.id into changed_id;
      if changed_id is null then raise exception 'Insufficient inventory'; end if;
      changed_id := null;
    end if;
  end loop;
end;
$$;

create or replace function public.release_product_inventory(p_items jsonb)
returns void language plpgsql security definer set search_path = public as $$
declare
  item jsonb;
begin
  for item in select value from jsonb_array_elements(p_items)
  loop
    if item->>'variant_id' is not null then
      update public.product_variants
      set stock_quantity = stock_quantity + (item->>'quantity')::integer
      where id = (item->>'variant_id')::uuid;
    end if;
  end loop;
end;
$$;