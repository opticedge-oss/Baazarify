'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Cart } from '@/types/cart';

const TAX_RATE = 0.17; // 17% tax

interface CartStore extends Cart {
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

const initialState: Cart = {
  items: [],
  subtotal: 0,
  tax: 0,
  total: 0,
};

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      ...initialState,

      addItem: (item: CartItem) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.product_id === item.product_id
          );

          let newItems: CartItem[];
          if (existingItem) {
            newItems = state.items.map((i) =>
              i.product_id === item.product_id
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            );
          } else {
            newItems = [...state.items, item];
          }

          const subtotal = newItems.reduce(
            (sum, i) => sum + i.price * i.quantity,
            0
          );
          const tax = subtotal * TAX_RATE;
          const total = subtotal + tax;

          return {
            items: newItems,
            subtotal: Math.round(subtotal * 100) / 100,
            tax: Math.round(tax * 100) / 100,
            total: Math.round(total * 100) / 100,
          };
        }),

      removeItem: (productId: string) =>
        set((state) => {
          const newItems = state.items.filter(
            (i) => i.product_id !== productId
          );

          const subtotal = newItems.reduce(
            (sum, i) => sum + i.price * i.quantity,
            0
          );
          const tax = subtotal * TAX_RATE;
          const total = subtotal + tax;

          return {
            items: newItems,
            subtotal: Math.round(subtotal * 100) / 100,
            tax: Math.round(tax * 100) / 100,
            total: Math.round(total * 100) / 100,
          };
        }),

      updateQuantity: (productId: string, quantity: number) =>
        set((state) => {
          const newItems =
            quantity <= 0
              ? state.items.filter((i) => i.product_id !== productId)
              : state.items.map((i) =>
                  i.product_id === productId ? { ...i, quantity } : i
                );

          const subtotal = newItems.reduce(
            (sum, i) => sum + i.price * i.quantity,
            0
          );
          const tax = subtotal * TAX_RATE;
          const total = subtotal + tax;

          return {
            items: newItems,
            subtotal: Math.round(subtotal * 100) / 100,
            tax: Math.round(tax * 100) / 100,
            total: Math.round(total * 100) / 100,
          };
        }),

      clearCart: () => set(() => initialState),

      calculateTotals: () =>
        set((state) => {
          const subtotal = state.items.reduce(
            (sum, i) => sum + i.price * i.quantity,
            0
          );
          const tax = subtotal * TAX_RATE;
          const total = subtotal + tax;

          return {
            subtotal: Math.round(subtotal * 100) / 100,
            tax: Math.round(tax * 100) / 100,
            total: Math.round(total * 100) / 100,
          };
        }),
    }),
    {
      name: 'baazarify-cart',
      skipHydration: true,
    }
  )
);
