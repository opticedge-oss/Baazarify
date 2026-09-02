import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { OrderService } from '@/lib/orders/order.service';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { status } = await request.json();

    // Verify merchant owns this order
    const { data: merchant } = await supabase
      .from('merchants')
      .select('tenant_id')
      .eq('user_id', user.id)
      .single();

    if (!merchant) {
      return NextResponse.json(
        { error: 'Merchant not found' },
        { status: 404 }
      );
    }

    const { data: order } = await supabase
      .from('orders')
      .select('tenant_id')
      .eq('id', params.id)
      .single();

    if (!order || order.tenant_id !== merchant.tenant_id) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Update status
    const updated = await OrderService.updateOrderStatus(
      params.id,
      status as any
    );

    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    console.error('Order status update error:', error);
    return NextResponse.json(
      { error: 'Failed to update order status' },
      { status: 500 }
    );
  }
}
