import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

async function getMerchantContext() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { supabase, tenantId: null };
  const { data: merchant } = await supabase.from("merchants").select("tenant_id").eq("user_id", user.id).single();
  return { supabase, tenantId: merchant?.tenant_id ?? null };
}

export async function GET() {
  try {
    const { supabase, tenantId } = await getMerchantContext();
    if (!tenantId) return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
    const { data, error } = await supabase.from("products").select("*, categories(*), product_variants(*)").eq("tenant_id", tenantId).order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { supabase, tenantId } = await getMerchantContext();
    if (!tenantId) return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
    const body = await request.json();
    if (!body.title || typeof body.title !== "string") return NextResponse.json({ success: false, error: "Product title is required" }, { status: 400 });

    const slug = body.slug || body.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const { data: product, error: productError } = await supabase.from("products").insert({
      tenant_id: tenantId,
      title: body.title.trim(),
      slug,
      description: body.description || null,
      price: Number(body.price) || 0,
      compare_at_price: body.compare_at_price == null ? null : Number(body.compare_at_price),
      cost_per_item: body.cost_per_item == null ? null : Number(body.cost_per_item),
      category_id: body.category_id || null,
      images: Array.isArray(body.images) ? body.images : [],
      status: body.status || "active",
    }).select().single();
    if (productError) throw productError;

    if (Array.isArray(body.variants) && body.variants.length > 0) {
      const { error: variantError } = await supabase.from("product_variants").insert(body.variants.map((variant: { title?: string; sku?: string; price?: number; stock_quantity?: number }) => ({
        product_id: product.id,
        title: variant.title || "Default",
        sku: variant.sku || null,
        price: variant.price == null ? Number(body.price) || 0 : Number(variant.price),
        stock_quantity: Number(variant.stock_quantity) || 0,
      })));
      if (variantError) throw variantError;
    }

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Failed to create product" }, { status: 500 });
  }
}