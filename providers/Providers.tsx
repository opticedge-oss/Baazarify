"use client";

import KernelProvider from "./KernelProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <KernelProvider>{children}</KernelProvider>;
  }
  