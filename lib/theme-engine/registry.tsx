import React from 'react';
import { HeroBanner } from '@/components/theme/sections/HeroBanner';
import { FeaturedProducts } from '@/components/theme/sections/FeaturedProducts';
import { ImageWithText } from '@/components/theme/sections/ImageWithText';
import { CategoriesGrid } from '@/components/theme/sections/CategoriesGrid';
import { Testimonials } from '@/components/theme/sections/Testimonials';

const RichTextSection = ({ settings }: any) => (
  <section className="py-14 px-6 text-center border-b border-slate-100 bg-white">
      <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-800">{settings?.heading || 'About Our Store'}</h3>
                  <p className="text-slate-600 mt-3 text-sm leading-relaxed">
                          {settings?.content || 'We deliver top-notch products tailored for everyday comfort and style.'}
                                </p>
                                    </div>
                                      </section>
                                      );

                                      export const SECTION_COMPONENTS: Record<string, React.ComponentType<any>> = {
                                        // Hyphen Keys
                                          'hero-banner': HeroBanner,
                                            'featured-products': FeaturedProducts,
                                              'image-with-text': ImageWithText,
                                                'categories-grid': CategoriesGrid,
                                                  'testimonials': Testimonials,
                                                    'rich-text': RichTextSection,

                                                      // Underscore Keys (Safety Backup)
                                                        'hero_banner': HeroBanner,
                                                          'featured_products': FeaturedProducts,
                                                            'image_with_text': ImageWithText,
                                                              'categories_grid': CategoriesGrid,
                                                                'testimonials-section': Testimonials,
                                                                  'rich_text': RichTextSection,
                                                                  };
                                                                  