import { container } from "@/core/container";
import { SupabaseProductRepository } from "@/infrastructure/repositories/supabase-product-repository";
import { ProductManager } from "./product/product-manager";
import { ProductService } from "./product/product-service";

export function bootstrapCatalog(): void {
  const repository = new SupabaseProductRepository();
    const manager = new ProductManager(repository);
      const service = new ProductService(manager);

        container.register("productService", service);
        }
        