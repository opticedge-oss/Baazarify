import type { Product } from "./product-types";

export interface ProductRepository {
  findAll(tenantId?: string): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
      create(product: Omit<Product, "id">): Promise<Product>;
        update(id: string, product: Partial<Product>): Promise<Product | null>;
          delete(id: string): Promise<boolean>;
          }
          