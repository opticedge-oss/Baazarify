"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/cart";
import type { PaymentMethod } from "@/lib/payments/types";

export default function CheckoutPage() {
  const router = useRouter();
  const [tenant, setTenantFromUrl] = useState("default-store");
  const items = useCart((state) => state.items);
  const setTenant = useCart((state) => state.setTenant);
  const clearCart = useCart((state) => state.clearCart);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [availableMethods, setAvailableMethods] = useState<PaymentMethod[]>(["cod", "bank_transfer"]);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", street: "", city: "", notes: "" });
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const urlTenant = new URLSearchParams(window.location.search).get("tenant");
    const activeTenant = urlTenant || "default-store";
    setTenantFromUrl(activeTenant);
    setTenant(activeTenant);
  }, [setTenant]);

  useEffect(() => {
    fetch(`/api/payments/methods?tenantId=${encodeURIComponent(tenant)}`)
      .then((response) => response.json())
      .then((result) => {
        if (result.success && Array.isArray(result.data)) setAvailableMethods(result.data);
      })
      .catch(() => undefined);
  }, []);

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tenantId: tenant, items, subtotal, paymentMethod, shippingAddress: form, notes: form.notes }),
    });
    const result = await response.json();
    if (!response.ok || !result.success) setError(result.error || "Unable to place order");
    else { clearCart(); router.push(`/orders/success?order=${encodeURIComponent(result.data.orderNumber)}`); }
    setSubmitting(false);
  }

  if (items.length === 0) return <main className="mx-auto max-w-2xl px-6 py-24 text-center text-slate-300"><h1 className="text-2xl font-semibold text-white">Your cart is empty</h1><button onClick={() => router.push(`/${tenant}`)} className="mt-6 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950">Return to store</button></main>;

  const fields: Array<[keyof typeof form, string]> = [["firstName", "First name"], ["lastName", "Last name"], ["email", "Email"], ["phone", "Phone"], ["street", "Address"], ["city", "City"]];
  const allPaymentOptions: Array<[PaymentMethod, string, string]> = [["cod", "Cash on Delivery", "Pay when your order arrives"], ["bank_transfer", "Bank Transfer", "Receive bank details after placing order"], ["easypaisa", "Easypaisa", "Secure local wallet payment"], ["jazzcash", "JazzCash", "Secure local wallet payment"]];
  const paymentOptions = allPaymentOptions.filter(([method]) => availableMethods.includes(method));
  return <main className="mx-auto max-w-5xl px-6 py-12"><h1 className="text-3xl font-semibold text-white">Checkout</h1><form onSubmit={submitOrder} className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]"><section className="rounded-xl border border-slate-800 bg-slate-900 p-6"><h2 className="font-semibold text-white">Delivery details</h2><div className="mt-5 grid gap-4 sm:grid-cols-2">{fields.map(([name, label]) => <label key={name} className="text-sm text-slate-400"><span className="mb-1 block">{label}</span><input required={name !== "email"} type={name === "email" ? "email" : name === "phone" ? "tel" : "text"} value={form[name]} onChange={(event) => setForm({ ...form, [name]: event.target.value })} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none focus:border-emerald-500" /></label>)}</div><label className="mt-4 block text-sm text-slate-400"><span className="mb-1 block">Order notes</span><textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} rows={3} className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none focus:border-emerald-500" /></label><div className="mt-8 border-t border-slate-800 pt-6"><h2 className="font-semibold text-white">Payment method</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{paymentOptions.map(([method, label, description]) => <label key={method} className={`cursor-pointer rounded-lg border p-4 ${paymentMethod === method ? "border-emerald-500 bg-emerald-500/5" : "border-slate-700"}`}><input type="radio" name="paymentMethod" value={method} checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} className="sr-only" /><span className="block text-sm font-medium text-white">{label}</span><span className="mt-1 block text-xs text-slate-500">{description}</span></label>)}</div></div>{error && <p className="mt-4 text-sm text-red-400">{error}</p>}</section><aside className="h-fit rounded-xl border border-slate-800 bg-slate-900 p-6"><h2 className="font-semibold text-white">Total</h2><p className="mt-4 text-2xl font-semibold text-white">Rs. {subtotal.toLocaleString("en-PK")}</p><p className="mt-2 text-xs text-slate-500">Local payment options with Cash on Delivery support.</p><button disabled={submitting} className="mt-6 w-full rounded-lg bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 disabled:opacity-50">{submitting ? "Placing order..." : "Place order"}</button></aside></form></main>;
}