"use client";

import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";
import Overlay from "./Overlay";
import MobileDrawer from "./MobileDrawer";

import { SidebarProvider } from "@/context/SidebarContext";

interface AppShellProps {
  children: ReactNode;
    storeName?: string;
    }

    export default function AppShell({
      children,
        storeName = "Baazarify",
        }: AppShellProps) {
          return (
              <SidebarProvider>
                    <div className="flex h-screen bg-black">

                            {/* Desktop Sidebar */}
                                    <div className="hidden lg:flex">
                                              <Sidebar />
                                                      </div>

                                                              {/* Mobile Sidebar */}
                                                                      <MobileDrawer />

                                                                              {/* Overlay */}
                                                                                      <Overlay />

                                                                                              {/* Main Content */}
                                                                                                      <div className="flex min-w-0 flex-1 flex-col">

                                                                                                                <Header storeName={storeName} />

                                                                                                                          <main className="flex-1 overflow-auto p-6">
                                                                                                                                      {children}
                                                                                                                                                </main>

                                                                                                                                                        </div>

                                                                                                                                                              </div>
                                                                                                                                                                  </SidebarProvider>
                                                                                                                                                                    );
                                                                                                                                                                    }
                                                                                                                                                                    