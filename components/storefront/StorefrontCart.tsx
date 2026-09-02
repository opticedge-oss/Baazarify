'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useParams } from 'next/navigation';

export default function StorefrontCart() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cart = useCart();
  const params = useParams();
  const subdomain = params.subdomain as string;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Cart Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />
      )}

      <div
        className={`fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-200">
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.items.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item.product_id}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">Rs. {item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            cart.updateQuantity(
                              item.product_id,
                              item.quantity - 1
                            )
                          }
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button
                          onClick={() =>
                            cart.updateQuantity(
                              item.product_id,
                              item.quantity + 1
                            )
                          }
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                        <button
                          onClick={() => cart.removeItem(item.product_id)}
                          className="ml-auto text-red-500 text-sm hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.items.length > 0 && (
            <div className="border-t border-zinc-200 p-6 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">Rs. {cart.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (17%):</span>
                  <span className="font-medium">Rs. {cart.tax}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                  <span>Total:</span>
                  <span>Rs. {cart.total}</span>
                </div>
              </div>

              <Link
                href={`/store/${subdomain}/checkout`}
                onClick={() => setIsOpen(false)}
                className="block w-full py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition text-center"
              >
                Proceed to Checkout
              </Link>

              <button
                onClick={() => cart.clearCart()}
                className="w-full py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cart Button - Bottom Right */}
      {cart.items.length > 0 && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600 flex items-center justify-center z-40"
        >
          <ShoppingCart size={24} />
        </button>
      )}
    </>
  );
}
