import { bootstrapDomains } from '@/domains';
import { themeEngine } from '@/core/theme/theme-engine';

let bootstrapped = false;

export function bootstrap(): void {
  if (bootstrapped) return;

    bootstrapDomains();

      // Initialize Theme Engine
        const freeThemes = themeEngine.getFreeThemes();
          const premiumThemes = themeEngine.getPremiumThemes();

            console.log('✅ Bazaarify Bootstrapped Successfully!');
              console.log(`🎨 Free Themes: ${freeThemes.length}`);
                console.log(`💎 Premium Themes: ${premiumThemes.length}`);

                  bootstrapped = true;
                  }