import React from 'react';

interface HeroBannerProps {
  settings?: {
      heading?: string;
          subheading?: string;
              buttonText?: string;
                  alignment?: 'left' | 'center' | 'right';
                      bgColor?: string;
                        };
                        }

                        export function HeroBanner({ settings }: HeroBannerProps) {
                          const alignClass =
                              settings?.alignment === 'center'
                                    ? 'text-center items-center'
                                          : settings?.alignment === 'right'
                                                ? 'text-right items-end'
                                                      : 'text-left items-start';

                                                        return (
                                                            <section
                                                                  className="w-full py-16 px-6 flex flex-col justify-center transition-all duration-300"
                                                                        style={{ backgroundColor: settings?.bgColor || '#1e293b' }}
                                                                            >
                                                                                  <div className={`max-w-4xl mx-auto flex flex-col ${alignClass} space-y-4`}>
                                                                                          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
                                                                                                    {settings?.heading || 'Welcome to Our Store'}
                                                                                                            </h1>
                                                                                                                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl">
                                                                                                                              {settings?.subheading || 'Discover our exclusive seasonal collection with premium quality.'}
                                                                                                                                      </p>
                                                                                                                                              {settings?.buttonText && (
                                                                                                                                                        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-md transition">
                                                                                                                                                                    {settings.buttonText}
                                                                                                                                                                              </button>
                                                                                                                                                                                      )}
                                                                                                                                                                                            </div>
                                                                                                                                                                                                </section>
                                                                                                                                                                                                  );
                                                                                                                                                                                                  }
                                                                                                                                                                                                  