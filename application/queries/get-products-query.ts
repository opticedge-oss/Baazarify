import { ProductApplicationService } from "../services/product-application-service";

export class GetProductsQuery {
  private service: ProductApplicationService;

    constructor() {
        this.service = new ProductApplicationService();
          }

            async execute(tenantId?: string) {
                return this.service.getProducts(tenantId);
                  }
                  }
                  