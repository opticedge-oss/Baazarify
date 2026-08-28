import { NextResponse } from "next/server";
import { getAvailablePaymentMethods } from "@/lib/payments/providers";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const tenantId = new URL(request.url).searchParams.get("tenantId");
  const configuredMethods = getAvailablePaymentMethods();
  if (!tenantId) return NextResponse.json({ success: true, data: configuredMethods });

  const supabase = getSupabaseAdmin();
  const { data } = await supabase.from("tenant_payment_settings").select("enabled_methods").eq("tenant_id", tenantId).maybeSingle();
  const enabledMethods = data?.enabled_methods || ["cod", "bank_transfer"];
  return NextResponse.json({ success: true, data: configuredMethods.filter((method) => enabledMethods.includes(method)) });
}