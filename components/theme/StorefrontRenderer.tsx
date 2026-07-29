// components/theme/StorefrontRenderer.tsx
import React from 'react';
import { ThemeConfig } from '@/types/theme';
import { renderSection } from '@/lib/theme-engine/registry';

interface StorefrontRendererProps {
  config: ThemeConfig;
  }

  export default function StorefrontRenderer({ config }: StorefrontRendererProps) {
    if (!config || !config.layout_order) {
        return (
              <div className="p-8 text-center text-slate-500">
                      No active layout or sections found.
                            </div>
                                );
                                  }

                                    return (
                                        <div className="storefront-engine w-full min-h-screen bg-white">
                                              {config.layout_order.map((sectionId) => {
                                                      const section = config.sections.find((s) => s.id === sectionId);
                                                              if (!section) return null;

                                                                      return renderSection(section);
                                                                            })}
                                                                                </div>
                                                                                  );
                                                                                  }
                                                                                  