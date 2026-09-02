export interface CartItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  sku?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

export interface StorefrontProduct {
  id: string;
  tenant_id: string;
  title: string;
  description?: string;
  price: number;
  compare_at_price?: number;
  cost_per_item?: number;
  sku?: string;
  category_id?: string;
  images?: string[];
  status: 'active' | 'draft' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface CheckoutData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: {
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  billing_address?: {
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  payment_method: 'cod' | 'bank_transfer' | 'easypaisa' | 'jazzcash';
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  notes?: string;
}
