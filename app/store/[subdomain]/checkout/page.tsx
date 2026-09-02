'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import StoreHeader from '@/components/storefront/StoreHeader';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const params = useParams();
  const subdomain = params.subdomain as string;
  const cart = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    street: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'Pakistan',
    payment_method: 'cod' as const,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/store/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subdomain,
          customer_name: formData.customer_name,
          customer_email: formData.customer_email,
          customer_phone: formData.customer_phone,
          shipping_address: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            postal_code: formData.postal_code,
            country: formData.country,
          },
          payment_method: formData.payment_method,
          items: cart.items,
          subtotal: cart.subtotal,
          tax: cart.tax,
          total: cart.total,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const { order_id } = await response.json();
      cart.clearCart();
      router.push(`/store/${subdomain}/orders/${order_id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <StoreHeader storeName="Store" subdomain={subdomain} />
        <div className="max-w-2xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link
            href={`/store/${subdomain}/products`}
            className="text-emerald-600 hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <StoreHeader storeName="Store" subdomain={subdomain} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href={`/store/${subdomain}/products`}
          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-8"
        >
          <ArrowLeft size={20} />
          Back to Shopping
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="md:col-span-2">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Info */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="customer_name"
                    placeholder="Full Name"
                    value={formData.customer_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <input
                    type="email"
                    name="customer_email"
                    placeholder="Email Address"
                    value={formData.customer_email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <input
                  type="tel"
                  name="customer_phone"
                  placeholder="Phone Number"
                  value={formData.customer_phone}
                  onChange={handleInputChange}
                  required
                  className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
                <input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  value={formData.street}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
                />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <input
                    type="text"
                    name="postal_code"
                    placeholder="Postal Code"
                    value={formData.postal_code}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { value: 'cod', label: 'Cash on Delivery (COD)' },
                    { value: 'bank_transfer', label: 'Bank Transfer' },
                  ].map((method) => (
                    <label key={method.value} className="flex items-center">
                      <input
                        type="radio"
                        name="payment_method"
                        value={method.value}
                        checked={formData.payment_method === method.value}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-emerald-600"
                      />
                      <span className="ml-3 text-gray-700">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cart.items.map((item) => (
                  <div key={item.product_id} className="flex justify-between text-sm">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium">Rs. {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-300 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>Rs. {cart.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (17%)</span>
                  <span>Rs. {cart.tax}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>Rs. {cart.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
