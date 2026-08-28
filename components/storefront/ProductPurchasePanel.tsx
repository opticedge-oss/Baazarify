"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import type { Product, ProductVariant } from "@/types/product";
import { useCart } from "@/store/cart";

export default function ProductPurchasePanel({
  product,
  tenant,
}: {
  product: Product;
  tenant: string;
}) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.product_variants?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCart((state) => state.addItem);
  const price = selectedVariant?.price ?? product.price;
  const stock = selectedVariant?.stock_quantity;
  const unavailable = stock !== undefined && stock < quantity;

  function addToCart() {
    if (!product.id || unavailable) return;
    addItem({
      productId: product.id,
      variantId: selectedVariant?.id,
      title: product.title,
      sku: selectedVariant?.sku,
      price,
      quantity,
      image: product.images[0],
    });
    setAdded(true);
  }

  return (
    <div className="mt-8 space-y-6">
      {product.product_variants && product.product_variants.length > 0 ? (
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="variant">
            Choose an option
          </label>
          <select
            id="variant"
            value={selectedVariant?.id ?? ""}
            onChange={(event) => setSelectedVariant(product.product_variants?.find((variant) => variant.id === event.target.value))}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-3 text-sm text-white outline-none focus:border-emerald-500"
          >
            {product.product_variants.map((variant) => (
              <option key={variant.id ?? variant.title} value={variant.id} disabled={variant.stock_quantity < 1}>
                {variant.title} - Rs. {(variant.price ?? product.price).toLocaleString("en-PK")}
              </option>
            ))}
          </select>
        </div>
      ) : null}
      <div className="flex items-center gap-3">
        <label className="text-sm text-slate-400" htmlFor="quantity">Quantity</label>
        <input id="quantity" type="number" min={1} max={stock} value={quantity} onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))} className="w-20 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-center text-white outline-none focus:border-emerald-500" />
        {stock !== undefined ? <span className="text-xs text-slate-500">{stock} available</span> : null}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button disabled={unavailable} onClick={addToCart} className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"><ShoppingBag size={16} /> {added ? "Added to cart" : "Add to cart"}</button>
        {added ? <Link href={`/cart?tenant=${encodeURIComponent(tenant)}`} className="text-sm font-medium text-emerald-400 hover:text-emerald-300">View cart</Link> : null}
      </div>
    </div>
  );
}