-- Notification preferences
create table if not exists public.notification_preferences (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null unique references public.tenants(id) on delete cascade,
  email_on_order boolean default true,
  email_on_shipment boolean default true,
  email_on_delivery boolean default true,
  sms_enabled boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Store analytics
create table if not exists public.store_analytics (
  id uuid primary key default gen_random_uuid(),
  tenant_id text not null references public.tenants(id) on delete cascade,
  metric_date date not null,
  views_count integer default 0,
  orders_count integer default 0,
  revenue numeric default 0,
  created_at timestamp with time zone default now(),
  unique(tenant_id, metric_date)
);

-- Enable RLS
alter table public.notification_preferences enable row level security;
alter table public.store_analytics enable row level security;

-- RLS Policies
create policy "merchants manage own preferences" on public.notification_preferences
  for all using (
    exists (
      select 1 from public.merchants m
      where m.user_id = auth.uid() and m.tenant_id = notification_preferences.tenant_id
    )
  );

create policy "merchants view own analytics" on public.store_analytics
  for select using (
    exists (
      select 1 from public.merchants m
      where m.user_id = auth.uid() and m.tenant_id = store_analytics.tenant_id
    )
  );

-- Create indexes
create index idx_notification_preferences_tenant on public.notification_preferences(tenant_id);
create index idx_store_analytics_tenant_date on public.store_analytics(tenant_id, metric_date);
