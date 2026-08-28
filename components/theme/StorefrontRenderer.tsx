'use client';

import React from 'react';
import { ThemeConfig } from '@/types/theme';
import { SECTION_COMPONENTS } from '@/lib/theme-engine/registry';

interface StorefrontRendererProps {
  config: ThemeConfig;
  }

  export function StorefrontRenderer({ config }: StorefrontRendererProps) {
    if (!config || !config.sections) return null;

      return (
          <div className="w-full min-h-screen bg-white">
                {config.sections.map((section) => {
                        const Component = SECTION_COMPONENTS[section.type];

                                // Guard Check: Agar component registry mein na mile toh runtime crash se bachayein
                                        if (!Component) {
                                                  return (
                                                              <div
                                                                            key={section.id}
                                                                                          className="p-4 my-2 border border-dashed border-red-300 bg-red-50 text-red-600 text-xs text-center rounded"
                                                                                                      >
                                                                                                                    Missing Component for type: <strong>{section.type}</strong>
                                                                                                                                </div>
                                                                                                                                          );
                                                                                                                                                  }

                                                                                                                                                          return <Component key={section.id} settings={section.settings} blocks={section.blocks} />;
                                                                                                                                                                })}
                                                                                                                                                                    </div>
                                                                                                                                                                      );
                                                                                                                                                                      }
                                                                                                                                                                      