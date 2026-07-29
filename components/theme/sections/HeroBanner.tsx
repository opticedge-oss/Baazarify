// components/theme/sections/HeroBanner.tsx
import React from 'react';

interface HeroBannerProps {
  id: string;
    settings: {
        heading?: string;
            subheading?: string;
                buttonText?: string;
                    buttonLink?: string;
                        alignment?: 'left' | 'center' | 'right';
                            overlayOpacity?: number;
                                height?: 'small' | 'medium' | 'large';
                                  };
                                  }

                                  export default function HeroBanner({ id, settings }: HeroBannerProps) {
                                    const {
                                        heading = 'Summer Collection 2026',
                                            subheading = 'Discover our latest items.',
                                                buttonText = 'Shop Now',
                                                    buttonLink = '#',
                                                        alignment = 'center',
                                                            height = 'medium',
                                                              } = settings;

                                                                const heightClasses = {
                                                                    small: 'py-12 md:py-16',
                                                                        medium: 'py-20 md:py-32',
                                                                            large: 'py-32 md:py-48',
                                                                              };

                                                                                const alignClasses = {
                                                                                    left: 'text-left items-start',
                                                                                        center: 'text-center items-center',
                                                                                            right: 'text-right items-end',
                                                                                              };

                                                                                                return (
                                                                                                    <section
                                                                                                          id={id}
                                                                                                                className={`w-full bg-slate-900 text-white flex flex-col justify-center px-6 transition-all duration-300 ${heightClasses[height]} ${alignClasses[alignment]}`}
                                                                                                                    >
                                                                                                                          <div className="max-w-4xl mx-auto flex flex-col items-inherit space-y-4">
                                                                                                                                  {heading && (
                                                                                                                                            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                                                                                                                                                        {heading}
                                                                                                                                                                  </h1>
                                                                                                                                                                          )}
                                                                                                                                                                                  {subheading && (
                                                                                                                                                                                            <p className="text-base sm:text-xl text-slate-300 max-w-2xl">
                                                                                                                                                                                                        {subheading}
                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                          )}
                                                                                                                                                                                                                                  {buttonText && (
                                                                                                                                                                                                                                            <div className="pt-4">
                                                                                                                                                                                                                                                        <a
                                                                                                                                                                                                                                                                      href={buttonLink}
                                                                                                                                                                                                                                                                                    className="inline-block bg-white text-slate-900 hover:bg-slate-100 font-semibold px-6 py-3 rounded-lg shadow-md transition-colors"
                                                                                                                                                                                                                                                                                                >
                                                                                                                                                                                                                                                                                                              {buttonText}
                                                                                                                                                                                                                                                                                                                          </a>
                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                            )}
                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                      </section>
                                                                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                                                                        }
