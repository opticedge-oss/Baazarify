-- Store theme configurations
create table if not exists public.store_theme_configs (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null references public.tenants(id) on delete cascade,
  config jsonb not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(tenant_id)
);

-- Customer orders for storefronts
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null references public.tenants(id) on delete cascade,
  order_number text not null unique,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  customer_id uuid,
  status text default 'pending' check (status in ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  payment_status text default 'pending' check (payment_status in ('pending', 'completed', 'failed', 'refunded')),
  payment_method text not null check (payment_method in ('cod', 'bank_transfer', 'easypaisa', 'jazzcash')),
  items jsonb not null,
  shipping_address jsonb not null,
  billing_address jsonb,
  subtotal numeric not null,
  tax numeric not null,
  total numeric not null,
  notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS for orders
alter table public.store_theme_configs enable row level security;
alter table public.orders enable row level security;

-- RLS Policies for store_theme_configs
create policy "merchants can manage own theme" on public.store_theme_configs
  for all using (
    exists (
      select 1 from public.merchants m
      where m.user_id = auth.uid() and m.tenant_id = store_theme_configs.tenant_id
    )
  );

-- RLS Policies for orders
create policy "public can view orders by email" on public.orders
  for select using (
    customer_email = current_user_email() or
    exists (
      select 1 from public.merchants m
      where m.user_id = auth.uid() and m.tenant_id = orders.tenant_id
    )
  );

create policy "merchants can manage own orders" on public.orders
  for all using (
    exists (
      select 1 from public.merchants m
      where m.user_id = auth.uid() and m.tenant_id = orders.tenant_id
    )
  );

-- Create indexes for performance
create index idx_store_theme_configs_tenant on public.store_theme_configs(tenant_id);
create index idx_orders_tenant on public.orders(tenant_id);
create index idx_orders_email on public.orders(customer_email);
create index idx_orders_status on public.orders(status);
create index idx_orders_created_at on public.orders(created_at);
