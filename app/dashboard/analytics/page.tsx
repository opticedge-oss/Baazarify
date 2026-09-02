'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { BarChart, LineChart } from 'lucide-react';

export default async function AnalyticsDashboard() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: merchant } = await supabase
    .from('merchants')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (!merchant) redirect('/create-store');

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('tenant_id', merchant.tenant_id);

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('tenant_id', merchant.tenant_id);

  // Calculate analytics
  const analytics = {
    totalRevenue: orders?.reduce((sum, o) => sum + (o.total || 0), 0) || 0,
    totalOrders: orders?.length || 0,
    totalProducts: products?.length || 0,
    avgOrderValue: orders && orders.length > 0
      ? (orders.reduce((sum, o) => sum + (o.total || 0), 0) / orders.length).toFixed(0)
      : 0,
    conversionRate: products && products.length > 0
      ? ((orders?.length || 0) / (products.length * 10)).toFixed(1)
      : 0,
    completedOrders: orders?.filter(o => o.status === 'delivered').length || 0,
  };

  // Revenue by month
  const monthlyRevenue = orders?.reduce((acc: any, order) => {
    const month = new Date(order.created_at).toLocaleDateString('en-US', {
      month: 'short',
    });
    acc[month] = (acc[month] || 0) + order.total;
    return acc;
  }, {}) || {};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <p className="text-zinc-400 mt-1">Track your store performance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-zinc-400 text-sm">Total Revenue</p>
          <p className="text-3xl font-bold text-emerald-400 mt-2">Rs. {analytics.totalRevenue.toLocaleString()}</p>
          <p className="text-zinc-500 text-xs mt-2">From {analytics.totalOrders} orders</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-zinc-400 text-sm">Avg Order Value</p>
          <p className="text-3xl font-bold text-blue-400 mt-2">Rs. {analytics.avgOrderValue.toLocaleString()}</p>
          <p className="text-zinc-500 text-xs mt-2">Per order</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-zinc-400 text-sm">Completed Orders</p>
          <p className="text-3xl font-bold text-purple-400 mt-2">{analytics.completedOrders}</p>
          <p className="text-zinc-500 text-xs mt-2">{(analytics.completedOrders / analytics.totalOrders * 100 || 0).toFixed(0)}% completion rate</p>
        </div>
      </div>

      {/* Inventory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-zinc-400 text-sm">Total Products</p>
          <p className="text-3xl font-bold text-white mt-2">{analytics.totalProducts}</p>
          <p className="text-zinc-500 text-xs mt-2">In inventory</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-zinc-400 text-sm">Conversion Rate</p>
          <p className="text-3xl font-bold text-orange-400 mt-2">{analytics.conversionRate}%</p>
          <p className="text-zinc-500 text-xs mt-2">Orders per product</p>
        </div>
      </div>

      {/* Monthly Revenue Chart */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <BarChart size={20} />
          Monthly Revenue
        </h2>
        <div className="space-y-3">
          {Object.entries(monthlyRevenue).map(([month, revenue]: [string, any]) => (
            <div key={month}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-zinc-400 text-sm">{month}</span>
                <span className="text-white font-semibold">Rs. {revenue.toLocaleString()}</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full"
                  style={{
                    width: `${(revenue / Math.max(...Object.values(monthlyRevenue) as number[])) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
