/**
 * ==========================================
 * Order Types & Interfaces
 * ==========================================
 */

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PaymentMethod = 'cod' | 'bank_transfer' | 'easypaisa' | 'jazzcash';

export interface OrderItem {
  id?: string;
  order_id?: string;
  product_id: string;
  variant_id?: string;
  title: string;
  sku?: string;
  price: number;
  quantity: number;
  image?: string;
  subtotal: number;
}

export interface OrderAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id?: string;
  tenant_id?: string;
  order_number?: string;
  customer_id?: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method?: PaymentMethod;
  items: OrderItem[];
  shipping_address?: OrderAddress;
  billing_address?: OrderAddress;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CheckoutFormData {
  // Shipping
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;

  // Billing
  sameAsBilling: boolean;
  billingFirstName?: string;
  billingLastName?: string;
  billingStreet?: string;
  billingCity?: string;
  billingState?: string;
  billingPostalCode?: string;
  billingCountry?: string;

  // Order notes
  notes?: string;
}
