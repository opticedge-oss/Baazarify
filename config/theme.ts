export const THEMES = {
    FREE: {
        MINIMAL: {
              id: 'minimal',
                    name: 'Minimal Commerce',
                          tier: 'free',
                                description: 'Clean, fast, mobile-first theme',
                                      preview: '/themes/minimal/preview.png',
                                          },
                                              BASIC: {
                                                    id: 'basic',
                                                          name: 'Basic Store',
                                                                tier: 'free',
                                                                      description: 'Simple and functional store theme',
                                                                            preview: '/themes/basic/preview.png',
                                                                                },
                                                                                  },
                                                                                    PREMIUM: {
                                                                                        LUXURY: {
                                                                                              id: 'luxury',
                                                                                                    name: 'Luxury Emporium',
                                                                                                          tier: 'premium',
                                                                                                                price: 49.99,
                                                                                                                      description: 'Premium, elegant, high-end theme',
                                                                                                                            preview: '/themes/luxury/preview.png',
                                                                                                                                },
                                                                                                                                    BOLD: {
                                                                                                                                          id: 'bold',
                                                                                                                                                name: 'Bold Store',
                                                                                                                                                      tier: 'premium',
                                                                                                                                                            price: 39.99,
                                                                                                                                                                  description: 'Vibrant, energetic, modern theme',
                                                                                                                                                                        preview: '/themes/bold/preview.png',
                                                                                                                                                                            },
                                                                                                                                                                                AI_FIRST: {
                                                                                                                                                                                      id: 'ai-first',
                                                                                                                                                                                            name: 'AI-First Store',
                                                                                                                                                                                                  tier: 'premium',
                                                                                                                                                                                                        price: 59.99,
                                                                                                                                                                                                              description: 'Smart, adaptive, dynamic theme',
                                                                                                                                                                                                                    preview: '/themes/ai-first/preview.png',
                                                                                                                                                                                                                        },
                                                                                                                                                                                                                          },
                                                                                                                                                                                                                          } as const;

                                                                                                                                                                                                                          export type ThemeId = keyof typeof THEMES.FREE | keyof typeof THEMES.PREMIUM;
                                                                                                                                                                                                                          export type ThemeTier = 'free' | 'premium';
                                                                                                                                                                                                                          