"use client";

import Sidebar from "./Sidebar";
import { useSidebar } from "@/hooks/useSidebar";

export default function MobileDrawer() {
  const { isOpen } = useSidebar();

    return (
        <div
              className={`
                      fixed
                              inset-y-0
                                      left-0
                                              z-50
                                                      w-72
                                                              transform
                                                                      transition-transform
                                                                              duration-300
                                                                                      ease-in-out
                                                                                              lg:hidden
                                                                                                      ${
                                                                                                                isOpen
                                                                                                                            ? "translate-x-0"
                                                                                                                                        : "-translate-x-full"
                                                                                                                                                }
                                                                                                                                                      `}
                                                                                                                                                          >
                                                                                                                                                                <Sidebar />
                                                                                                                                                                    </div>
                                                                                                                                                                      );
                                                                                                                                                                      }
                                                                                                                                                                      