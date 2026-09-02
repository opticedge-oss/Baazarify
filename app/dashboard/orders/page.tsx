'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Eye, Filter } from 'lucide-react';

export default async function OrdersDashboard() {
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
    .eq('tenant_id', merchant.tenant_id)
    .order('created_at', { ascending: false });

  const stats = {
    total: orders?.length || 0,
    pending: orders?.filter(o => o.status === 'pending').length || 0,
    confirmed: orders?.filter(o => o.status === 'confirmed').length || 0,
    shipped: orders?.filter(o => o.status === 'shipped').length || 0,
    revenue: orders?.reduce((sum, o) => sum + (o.total || 0), 0) || 0,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Orders</h1>
        <p className="text-zinc-400 mt-1">Manage all customer orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-zinc-400 text-sm">Total Orders</p>
          <p className="text-2xl font-bold text-white mt-2">{stats.total}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-zinc-400 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-400 mt-2">{stats.pending}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-zinc-400 text-sm">Confirmed</p>
          <p className="text-2xl font-bold text-blue-400 mt-2">{stats.confirmed}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-zinc-400 text-sm">Shipped</p>
          <p className="text-2xl font-bold text-purple-400 mt-2">{stats.shipped}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-zinc-400 text-sm">Revenue</p>
          <p className="text-2xl font-bold text-emerald-400 mt-2">Rs. {stats.revenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-800 border-b border-zinc-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Order #</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Total</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Payment</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {orders && orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-800/50 transition">
                    <td className="px-6 py-4 text-white font-medium">{order.order_number}</td>
                    <td className="px-6 py-4 text-zinc-300">{order.customer_name}</td>
                    <td className="px-6 py-4 text-zinc-400 text-sm">{order.customer_email}</td>
                    <td className="px-6 py-4 text-white font-semibold">Rs. {order.total}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'pending' ? 'bg-yellow-500/15 text-yellow-400' :
                        order.status === 'confirmed' ? 'bg-blue-500/15 text-blue-400' :
                        order.status === 'shipped' ? 'bg-purple-500/15 text-purple-400' :
                        'bg-emerald-500/15 text-emerald-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.payment_status === 'pending' ? 'bg-yellow-500/15 text-yellow-400' :
                        order.payment_status === 'completed' ? 'bg-emerald-500/15 text-emerald-400' :
                        'bg-red-500/15 text-red-400'
                      }`}>
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-zinc-400 text-sm">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/dashboard/orders/${order.id}`}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded text-sm transition"
                      >
                        <Eye size={16} />
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-zinc-400">
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
