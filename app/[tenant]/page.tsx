import { StorefrontRenderer } from '@/components/theme/StorefrontRenderer';
import { defaultThemeConfig } from '@/lib/theme-engine/default-theme';
import type { ThemeConfig } from '@/types/theme';

interface StorePageProps {
  params: Promise<{ tenant: string }>;
}

export default async function StorefrontPage({ params }: StorePageProps) {
  const { tenant } = await params;

  const activeThemeConfig: ThemeConfig = await getStoreThemeConfig(tenant);

  return (
    <main className="storefront-root min-h-screen bg-background">
      <StorefrontRenderer config={activeThemeConfig} />
    </main>
  );
}

async function getStoreThemeConfig(tenantSlug: string): Promise<ThemeConfig> {
  void tenantSlug;
  return defaultThemeConfig;
}
