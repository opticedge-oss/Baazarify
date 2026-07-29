// app/admin/theme-builder/page.tsx
'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// SSR ko false kar ke dynamic import karein taake Turbopack object resolution error na de
const ThemeCustomizer = dynamic(
  () => import('../../../components/theme/ThemeCustomizer'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-full items-center justify-center bg-slate-950 text-white text-sm">
        Loading Theme Builder...
      </div>
    ),
  }
);

export default function ThemeBuilderPage() {
  return (
    <main className="w-full h-screen overflow-hidden bg-slate-950">
      <ThemeCustomizer previewUrl="/store-preview" />
    </main>
  );
}
