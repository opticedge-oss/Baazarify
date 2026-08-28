import Link from "next/link";

interface OrderSuccessPageProps {
  searchParams: Promise<{ order?: string }>;
}

export default async function OrderSuccessPage({ searchParams }: OrderSuccessPageProps) {
  const { order } = await searchParams;

  return (
    <main className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">Order received</p>
      <h1 className="mt-3 text-3xl font-semibold text-white">Thank you for your order</h1>
      <p className="mt-3 text-sm text-slate-400">
        {order ? `Your order number is ${order}.` : "Your order has been submitted."}
      </p>
      <Link href="/" className="mt-8 inline-flex rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400">
        Back to home
      </Link>
    </main>
  );
}