/**
 * ==========================================
 * Shopping Cart Page
 * ==========================================
 * Cart review before checkout
 */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/store/cart';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getCart } = useCart();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-600">Loading cart...</p>
      </div>
    );
  }

  const { subtotal, itemCount } = getCart();
  const tax = subtotal * 0.15; // 15% tax
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Shopping Cart
            </h1>
            <p className="text-slate-600 mb-8">Your cart is empty</p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-6 border-b border-slate-200 last:border-b-0"
                >
                  {/* Product Image */}
                  {item.image ? (
                    <div className="w-24 h-24 bg-slate-200 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 bg-slate-200 rounded flex-shrink-0" />
                  )}

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    {item.sku && (
                      <p className="text-sm text-slate-600">SKU: {item.sku}</p>
                    )}
                    <p className="text-lg font-bold text-slate-900 mt-2">
                      Rs. {item.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex flex-col items-end gap-4">
                    <button
                      onClick={() => removeItem(item.productId, item.variantId)}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>

                    <div className="flex items-center border border-slate-300 rounded">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity - 1,
                            item.variantId
                          )
                        }
                        className="px-3 py-1 text-slate-600 hover:bg-slate-100"
                      >
                        −
                      </button>
                      <span className="px-4 py-1 border-l border-r border-slate-300 font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.productId,
                            item.quantity + 1,
                            item.variantId
                          )
                        }
                        className="px-3 py-1 text-slate-600 hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>

                    <p className="font-bold text-slate-900">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/products"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-slate-200">
                <div className="flex justify-between text-slate-600">
                  <span>Items ({itemCount})</span>
                  <span>Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax (15%)</span>
                  <span>Rs. {tax.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <span className="text-2xl font-bold text-blue-600">
                  Rs. {total.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Proceed to Checkout
              </button>

              <p className="text-xs text-slate-500 text-center mt-4">
                Secure checkout powered by Baazarify
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
