import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

async function getMerchantTenant() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { supabase, tenantId: null };
  const { data: merchant } = await supabase.from("merchants").select("tenant_id").eq("user_id", user.id).single();
  return { supabase, tenantId: merchant?.tenant_id ?? null };
}

export async function GET() {
  const { supabase, tenantId } = await getMerchantTenant();
  if (!tenantId) return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
  const { data, error } = await supabase.from("tenant_payment_settings").select("enabled_methods, bank_transfer_instructions").eq("tenant_id", tenantId).maybeSingle();
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, data: data || { enabled_methods: ["cod", "bank_transfer"], bank_transfer_instructions: "" } });
}

export async function PUT(request: Request) {
  const { supabase, tenantId } = await getMerchantTenant();
  if (!tenantId) return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
  const body = await request.json();
  const allowed = ["cod", "bank_transfer", "easypaisa", "jazzcash"];
  const enabledMethods = Array.isArray(body.enabledMethods) ? body.enabledMethods.filter((method: unknown): method is string => typeof method === "string" && allowed.includes(method)) : [];
  if (enabledMethods.length === 0) return NextResponse.json({ success: false, error: "Select at least one payment method" }, { status: 400 });
  const { data, error } = await supabase.from("tenant_payment_settings").upsert({ tenant_id: tenantId, enabled_methods: enabledMethods, bank_transfer_instructions: String(body.bankTransferInstructions || "").trim() || null, updated_at: new Date().toISOString() }).select("enabled_methods, bank_transfer_instructions").single();
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, data });
}