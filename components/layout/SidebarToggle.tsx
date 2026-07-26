"use client";

import { useSidebar } from "@/hooks/useSidebar";

export default function SidebarToggle() {
  const { toggleSidebar } = useSidebar();

    return (
        <button
              type="button"
                    onClick={toggleSidebar}
                          aria-label="Toggle Sidebar"
                                className="
                                        inline-flex
                                                h-10
                                                        w-10
                                                                items-center
                                                                        justify-center
                                                                                rounded-lg
                                                                                        border
                                                                                                border-zinc-800
                                                                                                        bg-zinc-900
                                                                                                                text-white
                                                                                                                        transition
                                                                                                                                hover:bg-zinc-800
                                                                                                                                        lg:hidden
                                                                                                                                              "
                                                                                                                                                  >
                                                                                                                                                        <svg
                                                                                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                                                                                        className="h-5 w-5"
                                                                                                                                                                                fill="none"
                                                                                                                                                                                        viewBox="0 0 24 24"
                                                                                                                                                                                                stroke="currentColor"
                                                                                                                                                                                                        strokeWidth={2}
                                                                                                                                                                                                              >
                                                                                                                                                                                                                      <path
                                                                                                                                                                                                                                strokeLinecap="round"
                                                                                                                                                                                                                                          strokeLinejoin="round"
                                                                                                                                                                                                                                                    d="M4 6h16M4 12h16M4 18h16"
                                                                                                                                                                                                                                                            />
                                                                                                                                                                                                                                                                  </svg>
                                                                                                                                                                                                                                                                      </button>
                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                        