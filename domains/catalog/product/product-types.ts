/**
 *  * ==========================================
  * Product Domain Types
   * ==========================================
    */

    export type ProductStatus =
      | "draft"
        | "active"
          | "archived";

          export interface Product {
            id: string;
              merchantId: string;

                sku: string;

                  name: string;

                    description?: string;

                      status: ProductStatus;

                        createdAt: Date;

                          updatedAt: Date;
                          }
                          