"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ThemeCustomizations {
  colors: {
      primary: string;
          secondary: string;
            };
              typography: {
                  font: string;
                      size: string;
                        };
                          layout: {
                              spacing: string;
                                  width: string;
                                    };
                                      logo: string | null;
                                        darkMode: boolean;
                                        }

                                        interface ThemeContextType {
                                          customizations: ThemeCustomizations;
                                            updateCustomizations: (updates: Partial<ThemeCustomizations>) => void;
                                              resetToDefault: () => void;
                                                saveTheme: () => Promise<void>;
                                                }

                                                const defaultCustomizations: ThemeCustomizations = {
                                                  colors: {
                                                      primary: "#09E06B",
                                                          secondary: "#D4AF37",
                                                            },
                                                              typography: {
                                                                  font: "Inter",
                                                                      size: "medium",
                                                                        },
                                                                          layout: {
                                                                              spacing: "comfortable",
                                                                                  width: "normal",
                                                                                    },
                                                                                      logo: null,
                                                                                        darkMode: true,
                                                                                        };

                                                                                        const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

                                                                                        export function ThemeProvider({ children }: { children: ReactNode }) {
                                                                                          const [customizations, setCustomizations] = useState<ThemeCustomizations>(
                                                                                              defaultCustomizations
                                                                                                );

                                                                                                  const updateCustomizations = (updates: Partial<ThemeCustomizations>) => {
                                                                                                      setCustomizations((prev) => ({ ...prev, ...updates }));
                                                                                                        };

                                                                                                          const resetToDefault = () => {
                                                                                                              setCustomizations(defaultCustomizations);
                                                                                                                };

                                                                                                                  const saveTheme = async () => {
                                                                                                                      // TODO: Save to database
                                                                                                                          console.log("Saving theme:", customizations);
                                                                                                                              // API call will go here
                                                                                                                                };

                                                                                                                                  return (
                                                                                                                                      <ThemeContext.Provider
                                                                                                                                            value={{
                                                                                                                                                    customizations,
                                                                                                                                                            updateCustomizations,
                                                                                                                                                                    resetToDefault,
                                                                                                                                                                            saveTheme,
                                                                                                                                                                                  }}
                                                                                                                                                                                      >
                                                                                                                                                                                            {children}
                                                                                                                                                                                                </ThemeContext.Provider>
                                                                                                                                                                                                  );
                                                                                                                                                                                                  }

                                                                                                                                                                                                  export function useTheme() {
                                                                                                                                                                                                    const context = useContext(ThemeContext);
                                                                                                                                                                                                      if (!context) {
                                                                                                                                                                                                          throw new Error("useTheme must be used within a ThemeProvider");
                                                                                                                                                                                                            }
                                                                                                                                                                                                              return context;
                                                                                                                                                                                                              }