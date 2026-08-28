"use client";

import { useEffect } from "react";
import CartView from "@/components/storefront/CartView";
import { useCart } from "@/store/cart";

export default function CartPage() {
  const tenant = typeof window === "undefined"
    ? "default-store"
    : new URLSearchParams(window.location.search).get("tenant") || "default-store";
  const setTenant = useCart((state) => state.setTenant);

  useEffect(() => setTenant(tenant), [setTenant, tenant]);

  return <CartView tenant={tenant} />;
}