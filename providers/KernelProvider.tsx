"use client";

import { ReactNode, useEffect } from "react";
import { bootstrap } from "@/core/bootstrap";

interface KernelProviderProps {
  children: ReactNode;
  }

  export default function KernelProvider({ children }: KernelProviderProps) {
    useEffect(() => {
        bootstrap();
          }, []);

            return <>{children}</>;
            }
            