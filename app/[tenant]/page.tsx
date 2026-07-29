// app/[tenant]/page.tsx
import { renderSection } from '@/lib/theme-engine/registry';
import { ThemeConfig } from '@/types/theme';

interface StorePageProps {
  params: Promise<{ tenant: string }>;
  }

  export default async function StorefrontPage({ params }: StorePageProps) {
    const { tenant } = await params;
      
        // Database / Supabase se active theme configuration fetch karein
          const activeThemeConfig: ThemeConfig = await getStoreThemeConfig(tenant);

            return (
                <main className="storefront-root min-h-screen bg-background">
                      {activeThemeConfig.layout_order.map((sectionId) => {
                              const sectionData = activeThemeConfig.sections.find((s) => s.id === sectionId);
                                      if (!sectionData) return null;
                                              
                                                      return renderSection(sectionData);
                                                            })}
                                                                </main>
                                                                  );
                                                                  }

                                                                  async function getStoreThemeConfig(tenantSlug: string): Promise<ThemeConfig> {
                                                                    // Yahan Supabase se tenant settings fetch honge
                                                                      // Abhi ke liye fallback mock config:
                                                                        return {
                                                                            id: 'minimal-commerce',
                                                                                name: 'Minimal Commerce',
                                                                                    version: '1.0.0',
                                                                                        settings: { primary_color: '#000000' },
                                                                                            sections: [
                                                                                                  { id: 'hero_1', type: 'hero-banner', settings: { title: 'Welcome to Store', button_text: 'Shop Now' } },
                                                                                                        { id: 'products_1', type: 'featured-products', settings: { limit: 4 } }
                                                                                                            ],
                                                                                                                layout_order: ['hero_1', 'products_1']
                                                                                                                  };
                                                                                                                  }
                                                                                                                  