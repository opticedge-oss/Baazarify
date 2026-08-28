'use client';

import React from 'react';

const DUMMY_CATEGORIES = [
  { title: 'Men Collection', image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=500&q=80', count: '14 Items' },
    { title: 'Women Wear', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80', count: '28 Items' },
      { title: 'Accessories', image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&q=80', count: '19 Items' },
      ];

      export function CategoriesGrid({ settings }: any) {
        return (
            <section className="py-14 px-6 bg-slate-50 border-b border-slate-100">
                  <div className="max-w-6xl mx-auto">
                          <div className="text-center mb-10">
                                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                                                {settings?.heading || 'Shop By Category'}
                                                          </h2>
                                                                    <p className="text-sm text-slate-500 mt-2">Find exactly what you are looking for</p>
                                                                            </div>

                                                                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                                                                              {DUMMY_CATEGORIES.map((cat, i) => (
                                                                                                          <div key={i} className="group relative rounded-2xl overflow-hidden h-72 shadow-md bg-slate-900 cursor-pointer">
                                                                                                                        <img
                                                                                                                                        src={cat.image}
                                                                                                                                                        alt={cat.title}
                                                                                                                                                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500 opacity-80 group-hover:opacity-70"
                                                                                                                                                                                      />
                                                                                                                                                                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                                                                                                                                                                                                                    <h3 className="text-xl font-bold">{cat.title}</h3>
                                                                                                                                                                                                                                    <p className="text-xs text-slate-300 mt-1">{cat.count}</p>
                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                        ))}
                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                          </section>
                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                            