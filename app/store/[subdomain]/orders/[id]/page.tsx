'use server';

import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import StoreHeader from '@/components/storefront/StoreHeader';
import Link from 'next/link';
import { CheckCircle, Truck, Clock } from 'lucide-react';

interface OrderPageProps {
  params: { subdomain: string; id: string };
}

export default async function OrderPage({ params }: OrderPageProps) {
  const supabase = await createClient();

  // Fetch tenant
  const { data: tenant } = await supabase
    .from('tenants')
    .select('*')
    .eq('slug', params.subdomain)
    .single();

  if (!tenant) {
    notFound();
  }

  // Fetch order
  const { data: order } = await supabase
    .from('orders')
    .select('*')
    .eq('id', params.id)
    .eq('tenant_id', tenant.id)
    .single();

  if (!order) {
    notFound();
  }

  const statusIcons = {
    pending: <Clock className="text-yellow-500" size={24} />,
    confirmed: <CheckCircle className="text-blue-500" size={24} />,
    shipped: <Truck className="text-purple-500" size={24} />,
    delivered: <CheckCircle className="text-green-500" size={24} />,
  };

  return (
    <div className="min-h-screen bg-white">
      <StoreHeader storeName={tenant.name} subdomain={params.subdomain} />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600" size={24} />
            <div>
              <h1 className="text-2xl font-bold text-green-900">
                Order Confirmed!
              </h1>
              <p className="text-green-700 mt-1">
                Thank you for your order. We will contact you shortly.
              </p>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-gray-600 text-sm">Order Number</p>
              <p className="text-lg font-bold text-gray-900">{order.order_number}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Order Date</p>
              <p className="text-lg font-bold text-gray-900">
                {new Date(order.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Status</p>
              <div className="flex items-center gap-2 mt-1">
                {statusIcons[order.status as keyof typeof statusIcons] ||
                  statusIcons.pending}
                <span className="font-semibold capitalize">{order.status}</span>
              </div>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Amount</p>
              <p className="text-lg font-bold text-gray-900">Rs. {order.total}</p>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Delivery Information</h2>
          <div className="border border-gray-300 rounded-lg p-4">
            <p className="font-medium text-gray-900">{order.customer_name}</p>
            <p className="text-gray-600">{order.customer_email}</p>
            <p className="text-gray-600">{order.customer_phone}</p>
            <div className="mt-4 pt-4 border-t border-gray-300">
              <p className="text-sm text-gray-600">Shipping Address</p>
              <p className="text-gray-900">
                {order.shipping_address?.street}
              </p>
              <p className="text-gray-900">
                {order.shipping_address?.city}, {order.shipping_address?.state}{' '}
                {order.shipping_address?.postal_code}
              </p>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Order Items</h2>
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Product</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Qty</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Price</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items?.map((item: any, idx: number) => (
                  <tr key={idx} className="border-b last:border-b-0">
                    <td className="px-4 py-3">{item.title}</td>
                    <td className="px-4 py-3 text-right">{item.quantity}</td>
                    <td className="px-4 py-3 text-right">Rs. {item.price}</td>
                    <td className="px-4 py-3 text-right font-medium">
                      Rs. {item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="space-y-2 text-right">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">Rs. {order.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (17%)</span>
              <span className="font-medium">Rs. {order.tax}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-300">
              <span>Total</span>
              <span>Rs. {order.total}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Link
            href={`/store/${params.subdomain}/products`}
            className="flex-1 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition text-center"
          >
            Continue Shopping
          </Link>
          <Link
            href={`/store/${params.subdomain}`}
            className="flex-1 py-3 border border-emerald-600 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition text-center"
          >
            Back to Store
          </Link>
        </div>
      </div>
    </div>
  );
}
