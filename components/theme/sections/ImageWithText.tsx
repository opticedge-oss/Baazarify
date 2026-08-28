'use client';

import React from 'react';

export function ImageWithText({ settings }: any) {
  const imageOnLeft = settings?.imagePosition !== 'right';

    return (
        <section className="py-16 px-6 bg-white border-b border-slate-100">
              <div className={`max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 ${imageOnLeft ? '' : 'md:flex-row-reverse'}`}>
                      <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-lg bg-slate-100">
                                <img
                                            src={settings?.imageUrl || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80'}
                                                        alt={settings?.heading || 'Section Image'}
                                                                    className="w-full h-[360px] object-cover"
                                                                              />
                                                                                      </div>
                                                                                              <div className="w-full md:w-1/2 space-y-4">
                                                                                                        <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                                                                                                                    {settings?.caption || 'Featured Collection'}
                                                                                                                              </span>
                                                                                                                                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                                                                                                                                                    {settings?.heading || 'Crafted for Modern Lifestyle'}
                                                                                                                                                              </h2>
                                                                                                                                                                        <p className="text-slate-600 text-sm leading-relaxed">
                                                                                                                                                                                    {settings?.text || 'Explore our handpicked selections crafted with absolute precision and top tier material. Upgrade your lifestyle with premium quality products.'}
                                                                                                                                                                                              </p>
                                                                                                                                                                                                        {settings?.buttonText && (
                                                                                                                                                                                                                    <button className="px-6 py-3 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition shadow-sm">
                                                                                                                                                                                                                                  {settings.buttonText}
                                                                                                                                                                                                                                              </button>
                                                                                                                                                                                                                                                        )}
                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                          </section>
                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                            