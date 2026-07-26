import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],

    content: [
        "./app/**/*.{ts,tsx}",
            "./components/**/*.{ts,tsx}",
                "./features/**/*.{ts,tsx}",
                    "./providers/**/*.{ts,tsx}",
                        "./lib/**/*.{ts,tsx}",
                          ],

                            theme: {
                                extend: {
                                      colors: {
                                              primary: "var(--color-primary)",
                                                      secondary: "var(--color-secondary)",
                                                              accent: "var(--color-accent)",

                                                                      background: "var(--color-background)",
                                                                              foreground: "var(--color-foreground)",

                                                                                      border: "var(--color-border)",

                                                                                              card: "var(--color-card)",

                                                                                                      success: "var(--color-success)",
                                                                                                              warning: "var(--color-warning)",
                                                                                                                      destructive: "var(--color-destructive)",
                                                                                                                            },

                                                                                                                                  borderRadius: {
                                                                                                                                          sm: "var(--radius-sm)",
                                                                                                                                                  md: "var(--radius-md)",
                                                                                                                                                          lg: "var(--radius-lg)",
                                                                                                                                                                  xl: "var(--radius-xl)",
                                                                                                                                                                        },

                                                                                                                                                                              boxShadow: {
                                                                                                                                                                                      soft: "var(--shadow-soft)",
                                                                                                                                                                                              medium: "var(--shadow-medium)",
                                                                                                                                                                                                      large: "var(--shadow-large)",
                                                                                                                                                                                                            },
                                                                                                                                                                                                                },
                                                                                                                                                                                                                  },

                                                                                                                                                                                                                    plugins: [],
                                                                                                                                                                                                                    };

                                                                                                                                                                                                                    export default config;
                                                                                                                                                                                                                    