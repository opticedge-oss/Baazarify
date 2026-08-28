import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { verifyPaymentWebhook } from "@/lib/payments/webhook";
import type { PaymentMethod } from "@/lib/payments/types";

const methods: PaymentMethod[] = ["easypaisa", "jazzcash"];

export async function POST(request: Request) {
  const rawBody = await request.text();
  const method = request.headers.get("x-payment-provider") as PaymentMethod;
  const signature = request.headers.get("x-payment-signature");

  if (!methods.includes(method) || !verifyPaymentWebhook(method, rawBody, signature)) {
    return NextResponse.json({ success: false, error: "Invalid payment callback" }, { status: 401 });
  }

  try {
    const body = JSON.parse(rawBody) as {
      orderNumber?: string;
      status?: "completed" | "failed";
      providerReference?: string;
    };
    if (!body.orderNumber || !body.status) {
      return NextResponse.json({ success: false, error: "Invalid payment callback payload" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("orders")
      .update({
        payment_status: body.status,
        status: body.status === "completed" ? "confirmed" : "pending",
        payment_reference: body.providerReference || null,
      })
      .eq("order_number", body.orderNumber)
      .select("id, order_number")
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Failed to update payment" }, { status: 500 });
  }
}