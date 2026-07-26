import type { ProductRepository } from "./product-repository";
import type { Product } from "./product-types";

export class MemoryProductRepository implements ProductRepository {
  private products: Product[] = [];

    async findAll(tenantId?: string): Promise<Product[]> {
        return this.products;
          }

            async findById(id: string): Promise<Product | null> {
                return this.products.find(p => p.id === id) || null;
                  }

                    async create(product: Omit<Product, "id">): Promise<Product> {
                        const newProduct = { ...product, id: crypto.randomUUID() };
                            this.products.push(newProduct);
                                return newProduct;
                                  }

                                    async update(id: string, product: Partial<Product>): Promise<Product | null> {
                                        const index = this.products.findIndex(p => p.id === id);
                                            if (index === -1) return null;
                                                this.products[index] = { ...this.products[index], ...product };
                                                    return this.products[index];
                                                      }

                                                        async delete(id: string): Promise<boolean> {
                                                            const index = this.products.findIndex(p => p.id === id);
                                                                if (index === -1) return false;
                                                                    this.products.splice(index, 1);
                                                                        return true;
                                                                          }
                                                                          }
                                                                          