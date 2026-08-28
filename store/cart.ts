/**
 * ==========================================
 * Cart State Engine
 * ==========================================
 * Multi-tenant shopping cart using Zustand
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  title: string;
  sku?: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CartStore {
  tenantId: string | null;
  items: CartItem[];

  // Actions
  setTenant: (tenantId: string) => void;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  getCart: () => { items: CartItem[]; subtotal: number; itemCount: number };
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      tenantId: null,
      items: [],

      setTenant: (tenantId: string) => {
        set((state) =>
          state.tenantId === tenantId
            ? state
            : { tenantId, items: [] }
        );
      },

      addItem: (item: Omit<CartItem, 'id'>) => {
        if (item.quantity <= 0) return;

        set((state) => {
          const existingItem = state.items.find(
            (i) =>
              i.productId === item.productId &&
              (item.variantId ? i.variantId === item.variantId : !i.variantId)
          );

          if (existingItem) {
            // Increase quantity if item already in cart
            return {
              items: state.items.map((i) =>
                i.id === existingItem.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          // Add new item with unique ID
          const newItem: CartItem = {
            ...item,
            id: `${item.productId}-${item.variantId || 'default'}-${Date.now()}`,
          };

          return {
            items: [...state.items, newItem],
          };
        });
      },

      removeItem: (productId: string, variantId?: string) => {
        set((state) => ({
          items: state.items.filter(
            (i) =>
              !(
                i.productId === productId &&
                (variantId ? i.variantId === variantId : !i.variantId)
              )
          ),
        }));
      },

      updateQuantity: (
        productId: string,
        quantity: number,
        variantId?: string
      ) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }

        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId &&
            (variantId ? i.variantId === variantId : !i.variantId)
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getCart: () => {
        const state = get();
        const subtotal = state.items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        const itemCount = state.items.reduce((acc, item) => acc + item.quantity, 0);

        return { items: state.items, subtotal, itemCount };
      },
    }),
    {
      name: 'baazarify-cart',
      version: 1,
    }
  )
);
