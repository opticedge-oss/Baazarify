-- Atomic stock reservation function for orders
create or replace function public.reserve_product_inventory(
  p_tenant_id text,
  p_items jsonb
)
returns boolean as $$
declare
  v_item jsonb;
  v_variant_id uuid;
  v_quantity int;
  v_current_stock int;
begin
  for v_item in select jsonb_array_elements(p_items)
  loop
    v_variant_id := (v_item->>'variant_id')::uuid;
    v_quantity := (v_item->>'quantity')::int;

    select stock_quantity into v_current_stock
    from public.product_variants pv
    join public.products p on p.id = pv.product_id
    where pv.id = v_variant_id and p.tenant_id = p_tenant_id
    for update;

    if v_current_stock is null or v_current_stock < v_quantity then
      return false;
    end if;

    update public.product_variants
    set stock_quantity = stock_quantity - v_quantity
    where id = v_variant_id;
  end loop;

  return true;
end;
$$ language plpgsql;

-- Release reserved stock on order cancellation or failure
create or replace function public.release_product_inventory(p_items jsonb)
returns void as $$
declare
  v_item jsonb;
  v_variant_id uuid;
  v_quantity int;
begin
  for v_item in select jsonb_array_elements(p_items)
  loop
    v_variant_id := (v_item->>'variant_id')::uuid;
    v_quantity := (v_item->>'quantity')::int;

    if v_variant_id is not null and v_quantity > 0 then
      update public.product_variants
      set stock_quantity = stock_quantity + v_quantity
      where id = v_variant_id;
    end if;
  end loop;
end;
$$ language plpgsql;
