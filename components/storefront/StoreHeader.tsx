'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

interface StoreHeaderProps {
  storeName: string;
  subdomain: string;
}

export default function StoreHeader({ storeName, subdomain }: StoreHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const cart = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/store/${subdomain}`} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="font-semibold text-gray-900 hidden sm:inline">
              {storeName}
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href={`/store/${subdomain}/products`}
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Products
            </Link>
            <Link
              href={`/store/${subdomain}/about`}
              className="text-gray-600 hover:text-gray-900 transition"
            >
              About
            </Link>
            <Link
              href={`/store/${subdomain}/contact`}
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Contact
            </Link>
          </nav>

          {/* Cart Icon */}
          <div className="flex items-center gap-4">
            <Link
              href={`/store/${subdomain}/cart`}
              className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition"
            >
              <ShoppingCart size={20} />
              {cart.items.length > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cart.items.length}
                </span>
              )}
              <span className="hidden sm:inline text-sm font-medium">
                Rs. {cart.total}
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-zinc-200 pt-4">
            <Link
              href={`/store/${subdomain}/products`}
              className="block py-2 text-gray-600 hover:text-gray-900 transition"
              onClick={() => setMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href={`/store/${subdomain}/about`}
              className="block py-2 text-gray-600 hover:text-gray-900 transition"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href={`/store/${subdomain}/contact`}
              className="block py-2 text-gray-600 hover:text-gray-900 transition"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
