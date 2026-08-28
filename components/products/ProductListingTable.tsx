"use client";

import Link from "next/link";
import type { Product } from "@/types/product";

interface ProductListingTableProps {
  products: Product[];
}

function getStock(product: Product) {
  return (product.product_variants ?? []).reduce(
    (total, variant) => total + variant.stock_quantity,
    0
  );
}

export default function ProductListingTable({ products }: ProductListingTableProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-10 text-center">
        <p className="text-sm text-slate-400">No products found.</p>
        <Link
          href="/products/new"
          className="mt-4 inline-flex rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
        >
          Add your first product
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
      <table className="min-w-full divide-y divide-slate-800">
        <thead>
          <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th className="px-5 py-4">Product</th>
            <th className="px-5 py-4">Category</th>
            <th className="px-5 py-4">Price</th>
            <th className="px-5 py-4">Inventory</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {products.map((product) => {
            const stock = getStock(product);
            const productId = product.id;

            return (
              <tr key={productId ?? product.slug} className="text-sm text-slate-300">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt=""
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-lg bg-slate-800" />
                    )}
                    <div>
                      <p className="font-medium text-white">{product.title}</p>
                      <p className="text-xs text-slate-500">/{product.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-slate-400">
                  {product.categories?.name ?? "Uncategorized"}
                </td>
                <td className="px-5 py-4 font-medium text-white">
                  Rs. {product.price.toLocaleString("en-PK")}
                </td>
                <td className="px-5 py-4">{stock}</td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                    {product.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  {productId ? (
                    <Link
                      href={`/products/${productId}/edit`}
                      className="text-xs font-medium text-blue-400 hover:text-blue-300"
                    >
                      Edit
                    </Link>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}