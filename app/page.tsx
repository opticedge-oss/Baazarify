import Link from 'next/link';

export default function HomePage() {
  return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
                    <div>
                              <h1 className="text-2xl font-bold text-white tracking-wide">
                                          BAAZARIFY ENGINE
                                                    </h1>
                                                              <p className="text-xs text-slate-400 mt-2">
                                                                          Theme Customizer & Live Storefront Architecture
                                                                                    </p>
                                                                                            </div>

                                                                                                    <div className="space-y-3">
                                                                                                              <Link
                                                                                                                          href="/admin/theme-builder"
                                                                                                                                      className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 font-semibold text-sm rounded-xl transition shadow-lg shadow-blue-600/20"
                                                                                                                                                >
                                                                                                                                                            Open Theme Builder (Admin)
                                                                                                                                                                      </Link>

                                                                                                                                                                                <Link
                                                                                                                                                                                            href="/store-preview"
                                                                                                                                                                                                        className="block w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm rounded-xl transition"
                                                                                                                                                                                                                  >
                                                                                                                                                                                                                              View Live Store Preview
                                                                                                                                                                                                                                        </Link>
                                                                                                                                                                                                                                                </div>

                                                                                                                                                                                                                                                        <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-500">
                                                                                                                                                                                                                                                                  Next.js App Router • Live PostMessage Sync Active
                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                      