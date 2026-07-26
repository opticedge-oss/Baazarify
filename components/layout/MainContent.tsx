import type { ReactNode } from "react";

interface MainContentProps {
  children: ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
    return (
        <main
              className="
                      flex-1
                              overflow-auto
                                      bg-[var(--bzr-surface-page)]
                                              text-[var(--bzr-text-primary)]
                                                      p-6
                                                              lg:p-8
                                                                    "
                                                                        >
                                                                              <div className="mx-auto w-full max-w-7xl">
                                                                                      {children}
                                                                                            </div>
                                                                                                </main>
                                                                                                  );
                                                                                                  }
                                                                                                  