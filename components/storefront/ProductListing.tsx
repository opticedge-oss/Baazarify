/**
 * ==========================================
 * Product Listing Page
 * ==========================================
 * Multi-tenant storefront product browsing
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/store/cart';

export interface Product {
  id: string;
  title: string;
  slug: string;
  description?: string;
  price: number;
  compare_at_price?: number;
  cost_per_item?: number;
  category_id?: string;
  images: string[];
  status: 'active' | 'draft' | 'archived';
  created_at?: string;
  updated_at?: string;
}

interface ProductListingProps {
  tenantId?: string;
  categoryFilter?: string;
}

export default function ProductListingPage({
  tenantId,
  categoryFilter,
}: ProductListingProps) {
  const params = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const { addItem } = useCart();
  const storeTenant = tenantId || (params?.tenant as string) || 'default';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const query = new URLSearchParams({
          tenant: storeTenant,
          ...(categoryFilter && { category: categoryFilter }),
        });

        const res = await fetch(`/api/products?${query.toString()}`);
        const data = await res.json();

        if (!data.success) {
          setError(data.error || 'Failed to fetch products');
          setProducts([]);
        } else {
          setProducts(data.products || []);
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [storeTenant, categoryFilter]);

  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
      title: product.title,
      sku: product.slug,
      price: product.price,
      quantity: 1,
      image: product.images?.[0],
    });

    // Optional: Show a toast notification
    alert(`${product.title} added to cart!`);
  };

  // Pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-slate-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Our Products</h1>
          <p className="text-slate-600 mt-2">
            {products.length} products available
          </p>
        </div>

        {/* Products Grid */}
        {paginatedProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No products available</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
                >
                  {/* Product Image */}
                  <div className="aspect-square bg-slate-200 overflow-hidden relative group">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        No Image
                      </div>
                    )}
                    {product.compare_at_price &&
                      product.compare_at_price > product.price && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                          Sale
                        </div>
                      )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <Link href={`/${storeTenant}/products/${product.slug}`}>
                      <h3 className="font-semibold text-slate-900 hover:text-blue-600 line-clamp-2 cursor-pointer">
                        {product.title}
                      </h3>
                    </Link>

                    {product.description && (
                      <p className="text-slate-600 text-sm mt-1 line-clamp-2">
                        {product.description}
                      </p>
                    )}

                    {/* Price */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-lg font-bold text-slate-900">
                        Rs. {product.price.toLocaleString()}
                      </span>
                      {product.compare_at_price &&
                        product.compare_at_price > product.price && (
                          <span className="text-sm text-slate-500 line-through">
                            Rs. {product.compare_at_price.toLocaleString()}
                          </span>
                        )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.max(1, p - 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded border border-slate-300 text-slate-600 disabled:opacity-50 hover:bg-slate-100 transition"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded transition ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'border border-slate-300 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded border border-slate-300 text-slate-600 disabled:opacity-50 hover:bg-slate-100 transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
