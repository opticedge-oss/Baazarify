"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/store/cart";

const currency = new Intl.NumberFormat("en-PK", {
  style: "currency",
  currency: "PKR",
  maximumFractionDigits: 0,
});

export default function CartView({ tenant }: { tenant: string }) {
  const items = useCart((state) => state.items);
  const updateQuantity = useCart((state) => state.updateQuantity);
  const removeItem = useCart((state) => state.removeItem);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center text-slate-300">
        <h1 className="text-2xl font-semibold text-white">Your cart is empty</h1>
        <p className="mt-2 text-sm text-slate-400">Add something from your store to begin.</p>
        <Link href={`/${tenant}`} className="mt-6 inline-flex rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <main className="mx-auto grid max-w-5xl gap-8 px-6 py-12 lg:grid-cols-[1fr_320px]">
      <section>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">Your selection</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Shopping cart</h1>
          </div>
          <span className="text-sm text-slate-400">{items.reduce((sum, item) => sum + item.quantity, 0)} items</span>
        </div>
        <div className="divide-y divide-slate-800 rounded-xl border border-slate-800 bg-slate-900">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 p-5">
              {item.image ? <img src={item.image} alt="" className="h-20 w-20 rounded-lg object-cover" /> : <div className="h-20 w-20 rounded-lg bg-slate-800" />}
              <div className="min-w-0 flex-1">
                <p className="font-medium text-white">{item.title}</p>
                <p className="mt-1 text-sm text-slate-400">{currency.format(item.price)}</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center rounded-lg border border-slate-700">
                    <button aria-label="Decrease quantity" onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)} className="p-2 text-slate-400 hover:text-white"><Minus size={14} /></button>
                    <span className="min-w-8 text-center text-sm text-white">{item.quantity}</span>
                    <button aria-label="Increase quantity" onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)} className="p-2 text-slate-400 hover:text-white"><Plus size={14} /></button>
                  </div>
                  <button onClick={() => removeItem(item.productId, item.variantId)} className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300"><Trash2 size={13} /> Remove</button>
                </div>
              </div>
              <p className="font-medium text-white">{currency.format(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
      </section>
      <aside className="h-fit rounded-xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="font-semibold text-white">Order summary</h2>
        <div className="mt-5 flex justify-between text-sm text-slate-400"><span>Subtotal</span><span>{currency.format(subtotal)}</span></div>
        <div className="mt-3 flex justify-between border-b border-slate-800 pb-5 text-sm text-slate-400"><span>Delivery</span><span>Calculated at checkout</span></div>
        <div className="mt-5 flex justify-between text-lg font-semibold text-white"><span>Total</span><span>{currency.format(subtotal)}</span></div>
        <Link href={`/checkout?tenant=${encodeURIComponent(tenant)}`} className="mt-6 block rounded-lg bg-emerald-500 px-4 py-3 text-center text-sm font-semibold text-slate-950 hover:bg-emerald-400">Continue to checkout</Link>
      </aside>
    </main>
  );
}