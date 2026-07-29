// app/admin/theme-builder/page.tsx
'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Next.js Dynamic Import (SSR disable karke browser object resolution fix karta hai)
const ThemeCustomizer = dynamic(
  () => import('@/components/theme/ThemeCustomizer'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-full items-center justify-center bg-slate-950 text-slate-400 font-mono text-sm">
        Loading Theme Builder Engine...
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
