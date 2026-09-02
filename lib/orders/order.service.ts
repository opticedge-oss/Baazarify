import { createClient } from '@/lib/supabase/server';
import type { CheckoutData } from '@/types/cart';

export class OrderService {
  static async createOrder(data: CheckoutData & { tenant_id: string }) {
    const supabase = await createClient();

    // Generate order number
    const orderNumber = `ORD-${Date.now()}`;

    // Create order
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        tenant_id: data.tenant_id,
        order_number: orderNumber,
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        customer_phone: data.customer_phone,
        status: 'pending',
        payment_status: 'pending',
        payment_method: data.payment_method,
        items: data.items,
        shipping_address: data.shipping_address,
        subtotal: data.subtotal,
        tax: data.tax,
        total: data.total,
        notes: data.notes,
      })
      .select()
      .single();

    if (error) throw error;
    return order;
  }

  static async getOrder(orderId: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (error) throw error;
    return data;
  }

  static async getOrdersByTenant(tenantId: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async updateOrderStatus(
    orderId: string,
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  ) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async updatePaymentStatus(
    orderId: string,
    paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
  ) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('orders')
      .update({ payment_status: paymentStatus })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
