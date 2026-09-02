'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import type { StorefrontProduct } from '@/types/cart';

interface ProductCardProps {
  product: StorefrontProduct;
  subdomain: string;
}

export default function ProductCard({ product, subdomain }: ProductCardProps) {
  const cart = useCart();

  const handleAddToCart = () => {
    cart.addItem({
      product_id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      image: product.images?.[0],
      sku: product.sku,
    });
  };

  return (
    <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden hover:shadow-lg transition">
      {/* Image */}
      <div className="relative w-full h-48 bg-gray-100">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        {product.compare_at_price && product.compare_at_price > product.price && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded text-sm font-semibold">
            Sale
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <Link href={`/store/${subdomain}/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-emerald-600 transition">
            {product.title}
          </h3>
        </Link>

        {product.description && (
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">
            Rs. {product.price}
          </span>
          {product.compare_at_price && (
            <span className="text-sm text-gray-500 line-through">
              Rs. {product.compare_at_price}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full mt-4 py-2 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
