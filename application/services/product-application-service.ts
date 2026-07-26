import { container } from "@/core/container";
import { ProductService } from "@/domains/catalog/product/product-service";

export class ProductApplicationService {
  private productService: ProductService;

    constructor() {
        this.productService = container.resolve<ProductService>("productService");
          }

            async getProducts(tenantId?: string) {
                return this.productService.findAll(tenantId);
                  }
                  }
                  