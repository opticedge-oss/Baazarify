import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers/Providers";

export const metadata: Metadata = {
  title: "Baazarify",
    description: "AI-First Multi-Tenant Commerce Operating System",
    };

    export default function RootLayout({
      children,
      }: Readonly<{
        children: React.ReactNode;
        }>) {
          return (
              <html lang="en">
                    <body>
                            <Providers>
                                      {children}
                                              </Providers>
                                                    </body>
                                                        </html>
                                                          );
                                                          }
                                                          