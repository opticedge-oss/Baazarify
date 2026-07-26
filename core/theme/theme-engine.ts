import { THEMES } from '@/config/theme';

export class ThemeEngine {
  getTheme(themeId: string, tier: 'free' | 'premium') {
      const theme = this.findTheme(themeId, tier);
          if (!theme) {
                throw new Error('Theme not found');
                    }
                        return theme;
                          }

                            getFreeThemes() {
                                return Object.values(THEMES.FREE);
                                  }

                                    getPremiumThemes() {
                                        return Object.values(THEMES.PREMIUM);
                                          }

                                            private findTheme(themeId: string, tier: 'free' | 'premium') {
                                                const themeList = tier === 'free' ? THEMES.FREE : THEMES.PREMIUM;
                                                    return Object.values(themeList).find((theme) => theme.id === themeId);
                                                      }
                                                      }

                                                      export const themeEngine = new ThemeEngine();