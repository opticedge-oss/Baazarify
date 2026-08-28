/**
 * ==========================================
 * Checkout Page
 * ==========================================
 * Multi-step order checkout flow
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/store/cart';
import { CheckoutFormData, OrderAddress, OrderItem } from '@/types/order';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCart, clearCart } = useCart();
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>(
    'shipping'
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Pakistan',
    sameAsBilling: true,
  });

  const [orderId, setOrderId] = useState<string | null>(null);

  const { subtotal, itemCount } = getCart();
  const tax = subtotal * 0.15; // 15% tax
  const shipping = subtotal > 5000 ? 0 : 250; // Free shipping over Rs. 5000
  const total = subtotal + tax + shipping;

  if (items.length === 0 && step === 'shipping') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Checkout
          </h1>
          <p className="text-slate-600 mb-8">Your cart is empty</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Cart
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleShippingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.street ||
      !formData.city ||
      !formData.state ||
      !formData.postalCode
    ) {
      setError('Please fill in all required fields');
      return;
    }

    // Move to payment step
    setStep('payment');
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Prepare order data
      const orderItems: OrderItem[] = items.map((item) => ({
        product_id: item.productId,
        variant_id: item.variantId,
        title: item.title,
        sku: item.sku,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        subtotal: item.price * item.quantity,
      }));

      const shippingAddress: OrderAddress = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
      };

      const billingAddress = formData.sameAsBilling
        ? shippingAddress
        : {
            firstName: formData.billingFirstName || '',
            lastName: formData.billingLastName || '',
            email: formData.email,
            phone: formData.phone,
            street: formData.billingStreet || '',
            city: formData.billingCity || '',
            state: formData.billingState || '',
            postalCode: formData.billingPostalCode || '',
            country: formData.billingCountry || '',
          };

      // Create order
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: orderItems,
          shipping_address: shippingAddress,
          billing_address: billingAddress,
          subtotal,
          tax,
          shipping,
          total,
          notes: formData.notes,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to create order');
      }

      setOrderId(data.order?.id);
      clearCart();
      setStep('confirmation');
    } catch (err: any) {
      setError(err.message || 'Payment processing failed');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'confirmation' && orderId) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="text-5xl mb-4">✓</div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-slate-600 mb-2">Thank you for your order.</p>
          <p className="text-2xl font-bold text-blue-600 mb-6">
            Order #: {orderId}
          </p>
          <p className="text-slate-600 mb-8">
            A confirmation email has been sent to <br />
            <span className="font-semibold">{formData.email}</span>
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/orders')}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              View Orders
            </button>
            <button
              onClick={() => router.push('/products')}
              className="w-full px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-semibold"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              {/* Step Indicator */}
              <div className="flex gap-4 mb-8">
                <div
                  className={`flex-1 pb-4 border-b-2 ${
                    step === 'shipping' || step === 'payment'
                      ? 'border-blue-600'
                      : 'border-slate-300'
                  }`}
                >
                  <span className="font-semibold text-slate-900">
                    1. Shipping
                  </span>
                </div>
                <div
                  className={`flex-1 pb-4 border-b-2 ${
                    step === 'payment' || step === 'confirmation'
                      ? 'border-blue-600'
                      : 'border-slate-300'
                  }`}
                >
                  <span className="font-semibold text-slate-900">
                    2. Payment
                  </span>
                </div>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Shipping Form */}
              {step === 'shipping' && (
                <form onSubmit={handleShippingSubmit}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Postal Code *
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Country *
                        </label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                        >
                          <option value="Pakistan">Pakistan</option>
                          <option value="India">India</option>
                          <option value="Bangladesh">Bangladesh</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-6">
                      <input
                        type="checkbox"
                        name="sameAsBilling"
                        checked={formData.sameAsBilling}
                        onChange={handleInputChange}
                        className="rounded"
                      />
                      <label className="text-sm text-slate-600">
                        Billing address same as shipping
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Order Notes (Optional)
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600"
                        placeholder="Any special instructions..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                  >
                    Continue to Payment
                  </button>
                </form>
              )}

              {/* Payment Form */}
              {step === 'payment' && (
                <form onSubmit={handlePayment}>
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <p className="text-sm text-slate-600">
                        <strong>Shipping to:</strong> {formData.firstName}{' '}
                        {formData.lastName}, {formData.city}, {formData.state}
                      </p>
                      <button
                        type="button"
                        onClick={() => setStep('shipping')}
                        className="text-xs text-blue-600 hover:text-blue-700 mt-2 font-medium"
                      >
                        Edit Shipping Address
                      </button>
                    </div>

                    <div className="p-4 border border-slate-300 rounded-lg bg-blue-50">
                      <p className="text-sm font-medium text-slate-700">
                        Payment Method
                      </p>
                      <p className="text-sm text-slate-600 mt-2">
                        This demo uses Cash on Delivery. In production, integrate
                        with payment providers like Stripe, PayPal, or local
                        providers.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setStep('shipping')}
                      className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-semibold"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold"
                    >
                      {loading ? 'Processing...' : 'Place Order'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-slate-200 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-slate-600"
                  >
                    <span>
                      {item.title} <br />
                      <span className="text-xs">x{item.quantity}</span>
                    </span>
                    <span className="font-semibold">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax (15%)</span>
                  <span>Rs. {tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600 font-semibold">Free</span>
                    ) : (
                      `Rs. ${shipping.toLocaleString()}`
                    )}
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900">Total</span>
                  <span className="text-2xl font-bold text-blue-600">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
