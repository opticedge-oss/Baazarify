"use client";

export default function ProductToolbar() {
  return (
      <div className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}

                  <input
                          type="text"
                                  placeholder="Search products..."
                                          className="
                                                    w-full
                                                              rounded-xl
                                                                        border
                                                                                  border-zinc-700
                                                                                            bg-zinc-950
                                                                                                      px-4
                                                                                                                py-3
                                                                                                                          text-white
                                                                                                                                    outline-none
                                                                                                                                              transition
                                                                                                                                                        focus:border-emerald-500
                                                                                                                                                                  lg:max-w-md
                                                                                                                                                                          "
                                                                                                                                                                                />

                                                                                                                                                                                      {/* Actions */}

                                                                                                                                                                                            <div className="flex flex-wrap gap-3">

                                                                                                                                                                                                    <button className="rounded-xl border border-zinc-700 px-4 py-3 text-white transition hover:border-emerald-500">
                                                                                                                                                                                                              Filter
                                                                                                                                                                                                                      </button>

                                                                                                                                                                                                                              <button className="rounded-xl border border-zinc-700 px-4 py-3 text-white transition hover:border-emerald-500">
                                                                                                                                                                                                                                        Sort
                                                                                                                                                                                                                                                </button>

                                                                                                                                                                                                                                                        <button className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-black transition hover:bg-emerald-400">
                                                                                                                                                                                                                                                                  + Add Product
                                                                                                                                                                                                                                                                          </button>

                                                                                                                                                                                                                                                                                </div>

                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                      