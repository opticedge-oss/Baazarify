export interface Category {
      id: string;
        name: string;
          slug: string;
            image_url?: string;
              created_at?: string;
              }

              export interface ProductVariant {
                id?: string;
                  product_id?: string;
                    title: string;
                      sku?: string;
                        price?: number;
                          stock_quantity: number;
                          }

                          export interface Product {
                            id?: string;
                              title: string;
                                slug: string;
                                  description?: string;
                                    price: number;
                                      compare_at_price?: number;
                                        cost_per_item?: number;
                                          category_id?: string;
                                            images: string[];
                                              status: 'active' | 'draft' | 'archived';
                                                created_at?: string;
                                                  updated_at?: string;
                                                    categories?: Category;
                                                      product_variants?: ProductVariant[];
                                                      }
