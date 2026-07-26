import { ProductManager } from "./product-manager";
import type { Product } from "./product-types";

export class ProductService {
  constructor(private manager: ProductManager) {}

    async findAll(tenantId?: string): Promise<Product[]> {
        return this.manager.findAll(tenantId);
          }

            async findById(id: string): Promise<Product | null> {
                return this.manager.findById(id);
                  }

                    async create(product: Omit<Product, "id">): Promise<Product> {
                        return this.manager.create(product);
                          }

                            async update(id: string, product: Partial<Product>): Promise<Product | null> {
                                return this.manager.update(id, product);
                                  }

                                    async delete(id: string): Promise<boolean> {
                                        return this.manager.delete(id);
                                          }
                                          }
                                          