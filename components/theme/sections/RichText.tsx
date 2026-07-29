// components/themes/sections/RichText.tsx
import React from 'react';

interface RichTextProps {
  id: string;
    settings: {
        title?: string;
            content?: string;
                alignment?: 'left' | 'center' | 'right';
                  };
                  }

                  export default function RichText({ id, settings }: RichTextProps) {
                    const {
                        title = 'Crafted for Quality',
                            content = 'We believe in delivering top-notch products tailored for everyday comfort and style.',
                                alignment = 'center',
                                  } = settings;

                                    const alignClasses = {
                                        left: 'text-left items-start',
                                            center: 'text-center items-center',
                                                right: 'text-right items-end',
                                                  };

                                                    return (
                                                        <section id={id} className="w-full py-12 md:py-16 px-6 bg-white border-y border-slate-100">
                                                              <div className={`max-w-3xl mx-auto flex flex-col space-y-4 ${alignClasses[alignment]}`}>
                                                                      {title && (
                                                                                <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                                                                                            {title}
                                                                                                      </h2>
                                                                                                              )}
                                                                                                                      {content && (
                                                                                                                                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                                                                                                                                            {content}
                                                                                                                                                      </p>
                                                                                                                                                              )}
                                                                                                                                                                    </div>
                                                                                                                                                                        </section>
                                                                                                                                                                          );
                                                                                                                                                                          }
                                                                                                                                                                          