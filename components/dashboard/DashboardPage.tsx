'use client';

import Link from 'next/link';
import { TrendingUp, ShoppingCart, Package, Eye } from 'lucide-react';
import RecentOrders from './RecentOrders';
import ProductStats from '@/components/products/ProductStats';

interface DashboardPageProps {
  merchant: any;
  productCount: number;
  orderCount: number;
}

export default function DashboardPage({
  merchant,
  productCount,
  orderCount,
}: DashboardPageProps) {
  const quickLinks = [
    {
      title: 'Add Products',
      description: 'Upload new items to your store',
      icon: Package,
      href: '/dashboard/products/new',
      color: 'bg-blue-500',
    },
    {
      title: 'View Orders',
      description: 'Manage customer orders',
      icon: ShoppingCart,
      href: '/dashboard/orders',
      color: 'bg-emerald-500',
    },
    {
      title: 'Analytics',
      description: 'Track your performance',
      icon: TrendingUp,
      href: '/dashboard/analytics',
      color: 'bg-purple-500',
    },
    {
      title: 'Visit Storefront',
      description: 'See your live store',
      icon: Eye,
      href: `${process.env.NEXT_PUBLIC_STORE_URL || 'http://localhost:3000'}/store/${merchant.subdomain}`,
      color: 'bg-orange-500',
      external: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {merchant.store_name}! 👋
        </h1>
        <p className="text-zinc-400 mt-2">
          Here's what's happening with your store today
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-zinc-400 text-sm">Store Name</p>
          <p className="text-2xl font-bold text-white mt-2">{merchant.store_name}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-zinc-400 text-sm">Total Products</p>
          <p className="text-2xl font-bold text-blue-400 mt-2">{productCount}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-zinc-400 text-sm">Total Orders</p>
          <p className="text-2xl font-bold text-emerald-400 mt-2">{orderCount}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-zinc-400 text-sm">Industry</p>
          <p className="text-2xl font-bold text-purple-400 mt-2 capitalize">
            {merchant.industry}
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-emerald-500 transition group"
              >
                <div className={`${link.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-semibold text-white">{link.title}</h3>
                <p className="text-zinc-400 text-sm mt-1">{link.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Orders & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrders />
        </div>
        <div>
          <ProductStats />
        </div>
      </div>
    </div>
  );
}
