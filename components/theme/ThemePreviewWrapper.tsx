'use client';

import React, { useState, useEffect } from 'react';
import { ThemeConfig, CustomizerMessage } from '@/types/theme';
import { StorefrontRenderer } from './StorefrontRenderer';

interface ThemePreviewWrapperProps {
  initialConfig: ThemeConfig;
  }

  export default function ThemePreviewWrapper({ initialConfig }: ThemePreviewWrapperProps) {
  const [config, setConfig] = useState<ThemeConfig>(initialConfig);

  useEffect(() => {
    const handleMessage = (event: MessageEvent<CustomizerMessage>) => {
      const { type, payload } = event.data || {};

      if (!type || !payload) return;

      switch (type) {
        case 'UPDATE_GLOBAL_SETTINGS':
          setConfig((prev) => ({
            ...prev,
            settings: { ...prev.settings, ...payload },
          }));
          break;

        case 'UPDATE_SECTION_SETTING':
          setConfig((prev) => ({
            ...prev,
            sections: (prev.sections || []).map((section) =>
              section.id === payload.sectionId
                ? {
                    ...section,
                    settings: {
                      ...(section.settings || {}),
                      [payload.settingId ?? '']: payload.value,
                    },
                  }
                : section
            ),
          }));
          break;

        case 'REORDER_SECTIONS':
          setConfig((prev) => ({
            ...prev,
            layout_order: payload.layoutOrder ?? prev.layout_order,
          }));
          break;

        case 'ADD_SECTION':
          setConfig((prev) => ({
            ...prev,
            sections: [...(prev.sections || []), payload.section].filter(Boolean) as any,
            layout_order: [...(prev.layout_order || []), payload.section?.id].filter(Boolean) as string[],
          }));
          break;

        case 'REMOVE_SECTION':
          setConfig((prev) => ({
            ...prev,
            sections: (prev.sections || []).filter((s) => s.id !== payload.sectionId),
            layout_order: (prev.layout_order || []).filter((id) => id !== payload.sectionId),
          }));
          break;

        default:
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return <StorefrontRenderer config={config} />;
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          