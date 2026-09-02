'use server';

import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import StoreHeader from '@/components/storefront/StoreHeader';
import StorefrontCart from '@/components/storefront/StorefrontCart';
import ProductCard from '@/components/storefront/ProductCard';

interface ProductsPageProps {
  params: { subdomain: string };
  searchParams: { category?: string; sort?: string };
}

export default async function ProductsPage({
  params,
  searchParams,
}: ProductsPageProps) {
  const supabase = await createClient();

  // Fetch tenant
  const { data: tenant } = await supabase
    .from('tenants')
    .select('*')
    .eq('slug', params.subdomain)
    .single();

  if (!tenant) {
    notFound();
  }

  // Fetch products with optional filtering
  let query = supabase
    .from('products')
    .select('*')
    .eq('tenant_id', tenant.id)
    .eq('status', 'active');

  if (searchParams.category) {
    query = query.eq('category_id', searchParams.category);
  }

  if (searchParams.sort === 'price-low') {
    query = query.order('price', { ascending: true });
  } else if (searchParams.sort === 'price-high') {
    query = query.order('price', { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  const { data: products } = await query;

  return (
    <div className="min-h-screen bg-white">
      <StoreHeader storeName={tenant.name} subdomain={params.subdomain} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
          <p className="text-gray-600 mt-2">
            Explore our collection of premium products
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex gap-4 flex-wrap">
          <div>
            <label className="text-sm font-medium text-gray-700">Sort by</label>
            <select className="mt-1 px-3 py-2 border border-gray-300 rounded-lg">
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                subdomain={params.subdomain}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        )}
      </div>

      <StorefrontCart />
    </div>
  );
}
