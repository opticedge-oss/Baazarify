import { supabase } from "@/lib/supabase/client";
import type { ProductRepository } from "@/domain/catalog/product/product-repository";
import type { Product } from "@/domain/catalog/product/product-types";

export class SupabaseProductRepository implements ProductRepository {
  async findAll(tenantId?: string): Promise<Product[]> {
      let query = supabase.from("products").select("*");

          if (tenantId) {
                query = query.eq("tenant_id", tenantId);
                    }

                        const { data, error } = await query;

                            if (error) {
                                  console.error("Error fetching products:", error);
                                        return [];
                                            }

                                                return data || [];
                                                  }

                                                    async findById(id: string): Promise<Product | null> {
                                                        const { data, error } = await supabase
                                                              .from("products")
                                                                    .select("*")
                                                                          .eq("id", id)
                                                                                .single();

                                                                                    if (error) {
                                                                                          console.error("Error fetching product:", error);
                                                                                                return null;
                                                                                                    }

                                                                                                        return data;
                                                                                                          }

                                                                                                            async create(product: Omit<Product, "id">): Promise<Product> {
                                                                                                                const { data, error } = await supabase
                                                                                                                      .from("products")
                                                                                                                            .insert([product])
                                                                                                                                  .select()
                                                                                                                                        .single();

                                                                                                                                            if (error) {
                                                                                                                                                  console.error("Error creating product:", error);
                                                                                                                                                        throw error;
                                                                                                                                                            }

                                                                                                                                                                return data;
                                                                                                                                                                  }

                                                                                                                                                                    async update(id: string, product: Partial<Product>): Promise<Product | null> {
                                                                                                                                                                        const { data, error } = await supabase
                                                                                                                                                                              .from("products")
                                                                                                                                                                                    .update(product)
                                                                                                                                                                                          .eq("id", id)
                                                                                                                                                                                                .select()
                                                                                                                                                                                                      .single();

                                                                                                                                                                                                          if (error) {
                                                                                                                                                                                                                console.error("Error updating product:", error);
                                                                                                                                                                                                                      return null;
                                                                                                                                                                                                                          }

                                                                                                                                                                                                                              return data;
                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                  async delete(id: string): Promise<boolean> {
                                                                                                                                                                                                                                      const { error } = await supabase
                                                                                                                                                                                                                                            .from("products")
                                                                                                                                                                                                                                                  .delete()
                                                                                                                                                                                                                                                        .eq("id", id);

                                                                                                                                                                                                                                                            if (error) {
                                                                                                                                                                                                                                                                  console.error("Error deleting product:", error);
                                                                                                                                                                                                                                                                        return false;
                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                return true;
                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                  