import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { OrderService } from '@/lib/orders/order.service';
import type { CheckoutData } from '@/types/cart';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subdomain, ...checkoutData } = body as CheckoutData & {
      subdomain: string;
    };

    const supabase = await createClient();

    // Get tenant by subdomain
    const { data: tenant } = await supabase
      .from('tenants')
      .select('id')
      .eq('slug', subdomain)
      .single();

    if (!tenant) {
      return NextResponse.json(
        { error: 'Store not found' },
        { status: 404 }
      );
    }

    // Create order
    const order = await OrderService.createOrder({
      ...checkoutData,
      tenant_id: tenant.id,
    });

    return NextResponse.json(
      { order_id: order.id, order_number: order.order_number },
      { status: 201 }
    );
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
