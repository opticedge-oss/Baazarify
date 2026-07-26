"use client";

import {
  createContext,
    useContext,
      useState,
        ReactNode,
        } from "react";

        type SidebarContextType = {
          isOpen: boolean;
            openSidebar: () => void;
              closeSidebar: () => void;
                toggleSidebar: () => void;
                };

                const SidebarContext = createContext<SidebarContextType | null>(null);

                export function SidebarProvider({
                  children,
                  }: {
                    children: ReactNode;
                    }) {
                      const [isOpen, setIsOpen] = useState(false);

                        return (
                            <SidebarContext.Provider
                                  value={{
                                          isOpen,
                                                  openSidebar: () => setIsOpen(true),
                                                          closeSidebar: () => setIsOpen(false),
                                                                  toggleSidebar: () => setIsOpen((v) => !v),
                                                                        }}
                                                                            >
                                                                                  {children}
                                                                                      </SidebarContext.Provider>
                                                                                        );
                                                                                        }

                                                                                        export function useSidebarContext() {
                                                                                          const context = useContext(SidebarContext);

                                                                                            if (!context) {
                                                                                                throw new Error(
                                                                                                      "useSidebarContext must be used inside SidebarProvider"
                                                                                                          );
                                                                                                            }

                                                                                                              return context;
                                                                                                              }
                                                                                                              