'use client';

import React from 'react';

export function StoreNavbar({ brandName = 'My Store' }: { brandName?: string }) {
  return (
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-wider uppercase">{brandName}</h1>
                  <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
                          <a href="#" className="hover:text-slate-900">Home</a>
                                  <a href="#" className="hover:text-slate-900">Shop All</a>
                                          <a href="#" className="hover:text-slate-900">Categories</a>
                                                  <a href="#" className="hover:text-slate-900">Contact</a>
                                                        </nav>
                                                              <button className="px-4 py-2 text-xs font-semibold bg-slate-900 text-white rounded-lg">Cart (0)</button>
                                                                  </header>
                                                                    );
                                                                    }

                                                                    export function StoreFooter({ brandName = 'My Store' }: { brandName?: string }) {
                                                                      return (
                                                                          <footer className="w-full bg-slate-950 text-slate-400 py-12 px-6">
                                                                                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-sm">
                                                                                        <div>
                                                                                                  <h3 className="text-white font-bold text-lg mb-3">{brandName}</h3>
                                                                                                            <p className="text-xs leading-relaxed">Your premium destination for quality shopping. Cash on delivery available nationwide.</p>
                                                                                                                    </div>
                                                                                                                            <div>
                                                                                                                                      <h4 className="text-white font-semibold mb-3">Quick Links</h4>
                                                                                                                                                <ul className="space-y-2 text-xs">
                                                                                                                                                            <li><a href="#" className="hover:text-white">Track Order</a></li>
                                                                                                                                                                        <li><a href="#" className="hover:text-white">Shipping Policy</a></li>
                                                                                                                                                                                    <li><a href="#" className="hover:text-white">Return & Exchange</a></li>
                                                                                                                                                                                              </ul>
                                                                                                                                                                                                      </div>
                                                                                                                                                                                                              <div>
                                                                                                                                                                                                                        <h4 className="text-white font-semibold mb-3">Support</h4>
                                                                                                                                                                                                                                  <p className="text-xs">Email: support@store.com</p>
                                                                                                                                                                                                                                            <p className="text-xs mt-1">WhatsApp: +92 300 1234567</p>
                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                            <div>
                                                                                                                                                                                                                                                                      <h4 className="text-white font-semibold mb-3">Newsletter</h4>
                                                                                                                                                                                                                                                                                <div className="flex gap-2">
                                                                                                                                                                                                                                                                                            <input type="email" placeholder="Your email" className="bg-slate-900 text-white text-xs px-3 py-2 rounded w-full border border-slate-800" />
                                                                                                                                                                                                                                                                                                        <button className="bg-emerald-600 text-white text-xs px-3 py-2 rounded font-semibold">Join</button>
                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                      <div className="text-center text-xs text-slate-600 border-t border-slate-900 pt-6">
                                                                                                                                                                                                                                                                                                                                              © {new Date().getFullYear()} {brandName}. All rights reserved. Powered by Pakify SaaS.
                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                        </footer>
                                                                                                                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                                                                                                          