'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import OrderStatusUpdater from '@/components/orders/OrderStatusUpdater';

interface OrderDetailProps {
  params: { id: string };
}

export default async function OrderDetail({ params }: OrderDetailProps) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: merchant } = await supabase
    .from('merchants')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (!merchant) redirect('/create-store');

  const { data: order } = await supabase
    .from('orders')
    .select('*')
    .eq('id', params.id)
    .eq('tenant_id', merchant.tenant_id)
    .single();

  if (!order) notFound();

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/orders"
        className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition"
      >
        <ArrowLeft size={20} />
        Back to Orders
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Header */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-white">{order.order_number}</h1>
                <p className="text-zinc-400 text-sm mt-1">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition">
                <Download size={18} />
                Invoice
              </button>
            </div>
          </div>

          {/* Status & Payment */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <p className="text-zinc-400 text-sm mb-2">Order Status</p>
              <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <p className="text-zinc-400 text-sm mb-2">Payment Status</p>
              <p className="text-lg font-bold text-white capitalize">{order.payment_status}</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Customer Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-zinc-400 text-sm">Name</p>
                <p className="text-white font-medium mt-1">{order.customer_name}</p>
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Email</p>
                <p className="text-white font-medium mt-1">{order.customer_email}</p>
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Phone</p>
                <p className="text-white font-medium mt-1">{order.customer_phone}</p>
              </div>
              <div>
                <p className="text-zinc-400 text-sm">Payment Method</p>
                <p className="text-white font-medium mt-1 capitalize">{order.payment_method}</p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Shipping Address</h2>
            <div className="text-zinc-300 space-y-1">
              <p>{order.shipping_address?.street}</p>
              <p>{order.shipping_address?.city}, {order.shipping_address?.state} {order.shipping_address?.postal_code}</p>
              <p>{order.shipping_address?.country}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items?.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-zinc-800/50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-white font-medium">{item.title}</p>
                    <p className="text-zinc-400 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                    <p className="text-zinc-400 text-sm">Rs. {item.price}/unit</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Order Summary */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-zinc-300">
                <span>Subtotal</span>
                <span>Rs. {order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>Tax (17%)</span>
                <span>Rs. {order.tax.toLocaleString()}</span>
              </div>
              <div className="border-t border-zinc-700 pt-3 flex justify-between text-white font-bold text-lg">
                <span>Total</span>
                <span>Rs. {order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
