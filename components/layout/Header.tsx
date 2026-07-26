"use client";

import SidebarToggle from "./SidebarToggle";
import UserMenu from "./UserMenu";

interface HeaderProps {
  storeName?: string;
  }

  export default function Header({ storeName = "Baazarify" }: HeaderProps) {
    return (
        <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-4 lg:px-6">

              {/* Left */}
                    <div className="flex items-center gap-3">

                            {/* Mobile Hamburger */}
                                    <SidebarToggle />

                                            {/* Logo */}
                                                    <div className="flex flex-col">
                                                              <h1 className="text-lg font-bold text-white">
                                                                          {storeName}
                                                                                    </h1>

                                                                                              <span className="text-xs text-zinc-400">
                                                                                                          Commerce OS
                                                                                                                    </span>
                                                                                                                            </div>

                                                                                                                                  </div>

                                                                                                                                        {/* Right */}
                                                                                                                                              <div className="flex items-center gap-3">

                                                                                                                                                      <button
                                                                                                                                                                className="
                                                                                                                                                                            flex
                                                                                                                                                                                        h-10
                                                                                                                                                                                                    w-10
                                                                                                                                                                                                                items-center
                                                                                                                                                                                                                            justify-center
                                                                                                                                                                                                                                        rounded-full
                                                                                                                                                                                                                                                    border
                                                                                                                                                                                                                                                                border-zinc-800
                                                                                                                                                                                                                                                                            bg-zinc-900
                                                                                                                                                                                                                                                                                        text-white
                                                                                                                                                                                                                                                                                                    transition
                                                                                                                                                                                                                                                                                                                hover:bg-zinc-800
                                                                                                                                                                                                                                                                                                                          "
                                                                                                                                                                                                                                                                                                                                    aria-label="Account"
                                                                                                                                                                                                                                                                                                                                            >
                                                                                                                                                                                                                                                                                                                                                      👤
                                                                                                                                                                                                                                                                                                                                                              </button>

                                                                                                                                                                                                                                                                                                                                                                    </div>

                                                                                                                                                                                                                                                                                                                                                                        </header>
                                                                                                                                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                                                                                                                                          }