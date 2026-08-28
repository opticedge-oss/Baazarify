create extension if not exists "pgcrypto";

create table if not exists public.tenants (
  id text primary key,
  slug text not null unique,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null references public.tenants(id) on delete cascade,
  order_number text not null,
  status text not null default 'pending',
  payment_status text not null default 'pending',
  payment_method text not null default 'cod',
  payment_reference text,
  items jsonb not null default '[]'::jsonb,
  shipping_address jsonb not null,
  subtotal numeric(12, 2) not null default 0,
  shipping numeric(12, 2) not null default 0,
  total numeric(12, 2) not null default 0,
  notes text,
  created_at timestamptz not null default now(),
  unique (tenant_id, order_number)
);

create index if not exists orders_tenant_created_idx on public.orders (tenant_id, created_at desc);

create table if not exists public.payment_transactions (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null,
  provider_reference text,
  status text not null default 'pending',
  amount numeric(12, 2) not null default 0,
  raw_response jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists payment_transactions_order_idx on public.payment_transactions (order_id, created_at desc);

create table if not exists public.tenant_payment_settings (
  tenant_id text primary key references public.tenants(id) on delete cascade,
  enabled_methods text[] not null default array['cod', 'bank_transfer'],
  bank_transfer_instructions text,
  updated_at timestamptz not null default now()
);