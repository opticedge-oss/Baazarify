"use client";

import { useEffect, useState } from "react";

const options = [["cod", "Cash on Delivery", "Pay when the parcel arrives"], ["bank_transfer", "Bank Transfer", "Show your local bank details at checkout"], ["easypaisa", "Easypaisa", "Requires server gateway credentials"], ["jazzcash", "JazzCash", "Requires server gateway credentials"]] as const;

export default function PaymentSettingsPage() {
  const [enabled, setEnabled] = useState<string[]>(["cod", "bank_transfer"]);
  const [instructions, setInstructions] = useState("");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/payment-settings").then((response) => response.json()).then((result) => {
      if (result.success) { setEnabled(result.data.enabled_methods); setInstructions(result.data.bank_transfer_instructions || ""); }
    }).catch(() => setStatus("Unable to load payment settings"));
  }, []);

  async function save() {
    setSaving(true); setStatus("");
    const response = await fetch("/api/admin/payment-settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ enabledMethods: enabled, bankTransferInstructions: instructions }) });
    const result = await response.json();
    setStatus(result.success ? "Payment settings saved" : result.error || "Unable to save settings");
    setSaving(false);
  }

  return <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-300"><div className="mx-auto max-w-3xl"><p className="text-xs uppercase tracking-[0.2em] text-emerald-400">Store settings</p><h1 className="mt-2 text-3xl font-semibold text-white">Payment methods</h1><p className="mt-2 text-sm text-slate-400">Choose how customers can pay. Gateway secrets stay on the server.</p><section className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6"><div className="grid gap-3 sm:grid-cols-2">{options.map(([method, label, description]) => <label key={method} className={`cursor-pointer rounded-lg border p-4 ${enabled.includes(method) ? "border-emerald-500 bg-emerald-500/5" : "border-slate-700"}`}><input type="checkbox" checked={enabled.includes(method)} onChange={() => setEnabled((current) => current.includes(method) ? current.filter((item) => item !== method) : [...current, method])} className="sr-only" /><span className="block font-medium text-white">{label}</span><span className="mt-1 block text-xs text-slate-500">{description}</span></label>)}</div><label className="mt-6 block text-sm text-slate-400"><span className="mb-1 block">Bank transfer instructions</span><textarea value={instructions} onChange={(event) => setInstructions(event.target.value)} rows={4} placeholder="Bank name, account title, IBAN, and reference instructions" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-white outline-none focus:border-emerald-500" /></label><div className="mt-6 flex items-center gap-4"><button onClick={save} disabled={saving} className="rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 disabled:opacity-50">{saving ? "Saving..." : "Save payment settings"}</button>{status ? <span className="text-sm text-slate-400">{status}</span> : null}</div></section></div></main>;
}