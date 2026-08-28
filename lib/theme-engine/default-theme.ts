import { ThemeConfig } from '@/types/theme';

export interface GlobalSettings {
  primaryColor: string;
    accentColor: string;
      backgroundColor: string;
        textColor: string;
          fontFamily: string;
          }

          export interface ExtendedThemeConfig extends ThemeConfig {
            global_settings: GlobalSettings;
            }

            export const defaultThemeConfig: ExtendedThemeConfig = {
              id: 'default-theme',
                name: 'Minimal Commerce',
              version: '1.0.0',
                theme_name: 'Minimal Commerce',
                  settings: {},
                  global_settings: {
                      primaryColor: '#2563eb', // Blue-600
                          accentColor: '#10b981',  // Emerald-500
                              backgroundColor: '#ffffff',
                                  textColor: '#0f172a',
                                      fontFamily: 'Inter, sans-serif',
                                        },
                                          sections: [
                                              {
                                                    id: 'sec_hero',
                                                          type: 'hero-banner',
                                                                settings: {
                                                                        heading: 'Summer Collection 2026',
                                                                                subheading: 'Discover the latest trends in high-quality lifestyle gear.',
                                                                                        buttonText: 'Shop Now',
                                                                                                buttonLink: '/collections/all',
                                                                                                        bgColor: '#0f172a',
                                                                                                              },
                                                                                                                  },
                                                                                                                      {
                                                                                                                            id: 'sec_categories',
                                                                                                                                  type: 'categories-grid',
                                                                                                                                        settings: {
                                                                                                                                                heading: 'Explore Collections',
                                                                                                                                                      },
                                                                                                                                                          },
                                                                                                                                                              {
                                                                                                                                                                    id: 'sec_featured',
                                                                                                                                                                          type: 'featured-products',
                                                                                                                                                                                settings: {
                                                                                                                                                                                        title: 'Trending Products',
                                                                                                                                                                                                subtitle: 'Handpicked items for this season',
                                                                                                                                                                                                        columns: '3',
                                                                                                                                                                                                                productsCount: 3,
                                                                                                                                                                                                                      },
                                                                                                                                                                                                                          },
                                                                                                                                                                                                                            ],
                                                                                                                                                                                                                              layout_order: ['sec_hero', 'sec_categories', 'sec_featured'],
                                                                                                                                                                                                                              };
                                                                                                                                                                                                                              