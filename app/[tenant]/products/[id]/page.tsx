import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProductPurchasePanel from "@/components/storefront/ProductPurchasePanel";

interface ProductPageProps {
  params: Promise<{ tenant: string; id: string }>;
}

export default async function TenantProductPage({ params }: ProductPageProps) {
  const { tenant, id } = await params;
  const supabase = await createClient();
  const { data: product, error } = await supabase
    .from("products")
    .select("*, categories(*), product_variants(*)")
    .eq("id", id)
    .eq("tenant_id", tenant)
    .eq("status", "active")
    .single();

  if (error || !product) notFound();

  return (
    <main className="mx-auto grid max-w-5xl gap-10 px-6 py-14 md:grid-cols-2">
      <div className="aspect-square overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
        {product.images?.[0] ? <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover" /> : null}
      </div>
      <section className="py-4">
        {product.categories?.name ? <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">{product.categories.name}</p> : null}
        <h1 className="mt-3 text-3xl font-semibold text-white">{product.title}</h1>
        <p className="mt-4 text-2xl font-semibold text-white">Rs. {Number(product.price).toLocaleString("en-PK")}</p>
        {product.description ? <p className="mt-6 whitespace-pre-wrap text-sm leading-7 text-slate-400">{product.description}</p> : null}
        <ProductPurchasePanel product={product} tenant={tenant} />
      </section>
    </main>
  );
}