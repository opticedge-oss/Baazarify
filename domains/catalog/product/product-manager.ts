import type { ProductRepository } from "./product-repository";
import type { Product } from "./product-types";

export class ProductManager {
  constructor(private repository: ProductRepository) {}

    async findAll(tenantId?: string): Promise<Product[]> {
        return this.repository.findAll(tenantId);
          }

            async findById(id: string): Promise<Product | null> {
                return this.repository.findById(id);
                  }

                    async create(product: Omit<Product, "id">): Promise<Product> {
                        return this.repository.create(product);
                          }

                            async update(id: string, product: Partial<Product>): Promise<Product | null> {
                                return this.repository.update(id, product);
                                  }

                                    async delete(id: string): Promise<boolean> {
                                        return this.repository.delete(id);
                                          }
                                          }
                                          