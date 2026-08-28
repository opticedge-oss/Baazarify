import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getPaymentProvider } from "@/lib/payments/providers";
import type { PaymentMethod } from "@/lib/payments/types";

interface CheckoutItem {
  productId: string;
  variantId?: string;
  quantity: number;
}

export async function POST(request: Request) {
  let supabase: ReturnType<typeof getSupabaseAdmin> | null = null;
  let reservedItems: Array<{ variant_id: string; quantity: number }> = [];
  let createdOrderId: string | null = null;
  try {
    const body = await request.json();
    const paymentMethod = body.paymentMethod as PaymentMethod;
    const provider = getPaymentProvider(paymentMethod);
    if (!body.tenantId || !Array.isArray(body.items) || body.items.length === 0 || !provider) {
      return NextResponse.json({ success: false, error: "A tenant and at least one item are required" }, { status: 400 });
    }
    if (!provider.isConfigured()) {
      return NextResponse.json({ success: false, error: `${paymentMethod} is not available for this store` }, { status: 503 });
    }

    supabase = getSupabaseAdmin();
    const { data: paymentSettings } = await supabase.from("tenant_payment_settings").select("enabled_methods, bank_transfer_instructions").eq("tenant_id", body.tenantId).maybeSingle();
    const enabledMethods = paymentSettings?.enabled_methods || ["cod", "bank_transfer"];
    if (!enabledMethods.includes(paymentMethod)) {
      return NextResponse.json({ success: false, error: "This payment method is not enabled for the store" }, { status: 400 });
    }
    const requestedItems = body.items as CheckoutItem[];
    const productIds = requestedItems.map((item) => item.productId).filter(Boolean);
    const { data: products, error: productError } = await supabase
      .from("products")
      .select("id, title, price, images, tenant_id, status, product_variants(id, title, sku, price, stock_quantity)")
      .eq("tenant_id", body.tenantId)
      .in("id", productIds)
      .eq("status", "active");
    if (productError) throw productError;

    const validatedItems = requestedItems.map((item) => {
      const product = products?.find((candidate) => candidate.id === item.productId);
      const variant = product?.product_variants?.find((candidate) => candidate.id === item.variantId);
      const quantity = Number(item.quantity);
      if (!product || !Number.isInteger(quantity) || quantity < 1) throw new Error("One or more cart items are invalid");
      if (item.variantId && !variant) throw new Error("Selected product option is no longer available");
      if (variant && variant.stock_quantity < quantity) throw new Error(`Insufficient stock for ${product.title}`);
      const price = variant?.price ?? product.price;
      return {
        product_id: product.id,
        variant_id: variant?.id || null,
        title: variant?.title || product.title,
        sku: variant?.sku || null,
        price,
        quantity,
        image: product.images?.[0] || null,
        subtotal: price * quantity,
      };
    });
    const subtotal = validatedItems.reduce((total, item) => total + item.subtotal, 0);
    reservedItems = validatedItems.flatMap((item) => item.variant_id ? [{ variant_id: item.variant_id, quantity: item.quantity }] : []);
    const { error: reservationError } = await supabase.rpc("reserve_product_inventory", { p_tenant_id: body.tenantId, p_items: reservedItems });
    if (reservationError) throw reservationError;
    const orderNumber = `BZ-${Date.now().toString(36).toUpperCase()}`;
    const { data, error } = await supabase.from("orders").insert({
      tenant_id: body.tenantId,
      order_number: orderNumber,
      items: validatedItems,
      subtotal,
      total: subtotal,
      shipping_address: body.shippingAddress,
      notes: body.notes || null,
      status: "pending",
      payment_status: "pending",
      payment_method: paymentMethod,
    }).select("id, order_number").single();

    if (error) throw error;
    createdOrderId = data.id;
    const payment = await provider.createPayment({
      orderId: data.id,
      orderNumber: data.order_number,
      amount: subtotal,
      customer: {
        name: `${body.shippingAddress?.firstName ?? ""} ${body.shippingAddress?.lastName ?? ""}`.trim(),
        email: body.shippingAddress?.email,
        phone: body.shippingAddress?.phone,
      },
      returnUrl: body.returnUrl || "/orders/success",
    });
    const { error: transactionError } = await supabase.from("payment_transactions").insert({
      order_id: data.id,
      provider: paymentMethod,
      provider_reference: payment.providerReference || null,
      status: payment.status,
      amount: subtotal,
    });
    if (transactionError) throw transactionError;
    const paymentResponse = paymentMethod === "bank_transfer" && paymentSettings?.bank_transfer_instructions
      ? { ...payment, instructions: paymentSettings.bank_transfer_instructions }
      : payment;
    return NextResponse.json({ success: true, data: { id: data.id, orderNumber: data.order_number, payment: paymentResponse } }, { status: 201 });
  } catch (error) {
    if (supabase && reservedItems.length > 0) {
      await supabase.rpc("release_product_inventory", { p_items: reservedItems });
    }
    if (supabase && createdOrderId) {
      await supabase.from("orders").update({ status: "cancelled" }).eq("id", createdOrderId);
    }
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Failed to create order" }, { status: 500 });
  }
}