'use server';

import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { SECTION_COMPONENTS } from '@/lib/theme-engine/registry';
import StoreHeader from '@/components/storefront/StoreHeader';
import StorefrontCart from '@/components/storefront/StorefrontCart';

interface StorePageProps {
  params: { subdomain: string };
}

export default async function StorePage({ params }: StorePageProps) {
  const supabase = await createClient();

  // Fetch tenant by subdomain
  const { data: tenant } = await supabase
    .from('tenants')
    .select('*')
    .eq('slug', params.subdomain)
    .single();

  if (!tenant) {
    notFound();
  }

  // Fetch merchant data
  const { data: merchant } = await supabase
    .from('merchants')
    .select('*')
    .eq('tenant_id', tenant.id)
    .single();

  // Fetch theme configuration
  const { data: themeConfig } = await supabase
    .from('store_theme_configs')
    .select('*')
    .eq('tenant_id', tenant.id)
    .single();

  // Fetch active products for featured section
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('tenant_id', tenant.id)
    .eq('status', 'active')
    .limit(8);

  const config = themeConfig?.config || {
    sections: [],
    layout_order: [],
  };

  return (
    <div className="min-h-screen bg-white">
      <StoreHeader storeName={tenant.name} subdomain={params.subdomain} />

      {/* Render theme sections in order */}
      {(config.layout_order || []).map((sectionId: string) => {
        const section = (config.sections || []).find(
          (s: any) => s.id === sectionId
        );
        if (!section) return null;

        const Component = SECTION_COMPONENTS[
          section.type as keyof typeof SECTION_COMPONENTS
        ] as any;

        if (!Component) return null;

        // Pass products data to featured products section
        const sectionProps =
          section.type === 'featured-products'
            ? { settings: section.settings, products }
            : { settings: section.settings };

        return (
          <Component key={sectionId} {...sectionProps} />
        );
      })}

      {/* Floating Cart */}
      <StorefrontCart />
    </div>
  );
}
