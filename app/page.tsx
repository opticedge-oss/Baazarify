import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

export default function HomePage() {
  return (
      <AppShell>
            <div className="space-y-6">
                    <div className="max-w-2xl space-y-3">
                              <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
                                          Baazarify Commerce OS
                                                    </p>

                                                              <h1 className="text-4xl font-bold text-white">
                                                                          Welcome to Baazarify
                                                                                    </h1>

                                                                                              <p className="text-zinc-400">
                                                                                                          Your main UI workspace is ready. Open the playground to preview
                                                                                                                      components and pages.
                                                                                                                                </p>
                                                                                                                                        </div>

                                                                                                                                                <div className="flex flex-wrap gap-3">
                                                                                                                                                          <Link
                                                                                                                                                                      href="/playground"
                                                                                                                                                                                  className="rounded-lg bg-emerald-500 px-4 py-2 font-medium text-black transition hover:bg-emerald-400"
                                                                                                                                                                                            >
                                                                                                                                                                                                        Open Playground
                                                                                                                                                                                                                  </Link>
                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                    </AppShell>
                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                      