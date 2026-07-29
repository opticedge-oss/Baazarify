// lib/theme-engine/default-theme.ts
import { ThemeConfig } from '@/types/theme';

export const defaultThemeConfig: ThemeConfig = {
  id: 'minimal-commerce',
    name: 'Minimal Commerce',
      version: '1.0.0',
        settings: {
            primaryColor: '#0f172a',    // Dark Slate
                secondaryColor: '#2563eb',  // Ocean Blue
                    backgroundColor: '#ffffff', // Clean White
                        textColor: '#1e293b',       // Deep Charcoal
                            headingFont: 'Inter',
                                bodyFont: 'Inter',
                                    borderRadius: '8px',
                                      },
                                        sections: [
                                            {
                                                  id: 'hero_banner_1',
                                                        type: 'hero-banner',
                                                              settings: {
                                                                      heading: 'Summer Collection 2026',
                                                                              subheading: 'Discover the latest trends in high-quality lifestyle gear.',
                                                                                      buttonText: 'Shop Now',
                                                                                              buttonLink: '/collections/all',
                                                                                                      alignment: 'center',
                                                                                                              overlayOpacity: 40,
                                                                                                                      height: 'medium',
                                                                                                                            },
                                                                                                                                  blocks: [],
                                                                                                                                      },
                                                                                                                                          {
                                                                                                                                                id: 'featured_products_1',
                                                                                                                                                      type: 'featured-products',
                                                                                                                                                            settings: {
                                                                                                                                                                    title: 'Trending Products',
                                                                                                                                                                            subtitle: 'Our handpicked selection for this season',
                                                                                                                                                                                    productCount: 4,
                                                                                                                                                                                            columns: 4,
                                                                                                                                                                                                    showVendor: true,
                                                                                                                                                                                                            showPrice: true,
                                                                                                                                                                                                                  },
                                                                                                                                                                                                                        blocks: [],
                                                                                                                                                                                                                            },
                                                                                                                                                                                                                                {
                                                                                                                                                                                                                                      id: 'rich_text_1',
                                                                                                                                                                                                                                            type: 'rich-text',
                                                                                                                                                                                                                                                  settings: {
                                                                                                                                                                                                                                                          title: 'Crafted for Quality',
                                                                                                                                                                                                                                                                  content: 'We believe in delivering top-notch products tailored for everyday comfort and style.',
                                                                                                                                                                                                                                                                          alignment: 'center',
                                                                                                                                                                                                                                                                                },
                                                                                                                                                                                                                                                                                      blocks: [],
                                                                                                                                                                                                                                                                                          },
                                                                                                                                                                                                                                                                                            ],
                                                                                                                                                                                                                                                                                              layout_order: ['hero_banner_1', 'featured_products_1', 'rich_text_1'],
                                                                                                                                                                                                                                                                                              };
                                                                                                                                                                                                                                                                                              