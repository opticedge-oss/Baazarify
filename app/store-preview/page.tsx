// app/store-preview/page.tsx
import React from 'react';
import ThemePreviewWrapper from '@/components/theme/ThemePreviewWrapper';
import { defaultThemeConfig } from '@/lib/theme-engine/default-theme';

export default function StorePreviewPage() {
  // Production mein yahan tenant ki saved database config pass hogi
    return <ThemePreviewWrapper initialConfig={defaultThemeConfig} />;
    }
    