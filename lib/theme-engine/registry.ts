// lib/theme-engine/registry.tsx
import React from 'react';
import dynamic from 'next/dynamic';
import { ThemeSection } from '@/types/theme';

// Dynamic imports taake performance maximum rahe (Code-Splitting)
export const SECTION_COMPONENTS: Record<string, React.ComponentType<any>> = {
  'hero-banner': dynamic(() => import('@/components/theme/sections/HeroBanner')),
    'featured-products': dynamic(() => import('@/components/theme/sections/FeaturedProducts')),
      'rich-text': dynamic(() => import('@/components/theme/sections/RichText')),
      };

      /**
       * Section Data se dynamic React Component render karne ke liye helper function
        */
        export function renderSection(section: ThemeSection) {
          const Component = SECTION_COMPONENTS[section.type];

            if (!Component) {
                console.warn(`[Theme Engine] Section type "${section.type}" was not found in registry.`);
                    return null;
                      }

                        return (
                            <Component
                                  key={section.id}
                                        id={section.id}
                                              settings={section.settings}
                                                    blocks={section.blocks}
                                                        />
                                                          );
                                                          }
