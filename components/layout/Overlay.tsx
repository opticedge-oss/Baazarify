"use client";

import { useSidebar } from "@/hooks/useSidebar";

export default function Overlay() {
  const { isOpen, closeSidebar } = useSidebar();

    if (!isOpen) return null;

      return (
          <div
                onClick={closeSidebar}
                      aria-hidden="true"
                            className="
                                    fixed
                                            inset-0
                                                    z-40
                                                            bg-black/50
                                                                    backdrop-blur-sm
                                                                            transition-opacity
                                                                                    duration-300
                                                                                            lg:hidden
                                                                                                  "
                                                                                                      />
                                                                                                        );
                                                                                                        }
                                                                                                        