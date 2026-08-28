'use client';

import React from 'react';

export function Testimonials({ settings }: any) {
  const reviews = [
      { name: 'Hamza Malik', role: 'Verified Buyer', review: 'Quality aur shipping speed dono lajawab hain! Product exact screenshot jaise mili.' },
          { name: 'Ayesha Khan', role: 'Regular Customer', review: 'Customer service bhot responsive hai. Fabric ki quality expect se ziada achhi nikli.' },
            ];

              return (
                  <section className="py-16 px-6 bg-white border-b border-slate-100">
                        <div className="max-w-5xl mx-auto text-center">
                                <h2 className="text-3xl font-extrabold text-slate-900 mb-10">
                                          {settings?.heading || 'What Our Customers Say'}
                                                  </h2>
                                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                                    {reviews.map((r, i) => (
                                                                                <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-3 shadow-sm">
                                                                                              <div className="text-amber-400 text-sm">★★★★★</div>
                                                                                                            <p className="text-slate-700 italic text-sm font-medium">"{r.review}"</p>
                                                                                                                          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                                                                                                                                          <div>
                                                                                                                                                            <h4 className="font-bold text-slate-900 text-sm">{r.name}</h4>
                                                                                                                                                                              <p className="text-xs text-slate-500">{r.role}</p>
                                                                                                                                                                                              </div>
                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                  ))}
                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                    </section>
                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                      