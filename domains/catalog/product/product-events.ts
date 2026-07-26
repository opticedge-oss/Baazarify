/**
 *  * ==========================================
  * Product Domain Events
   * ==========================================
    */

    export const PRODUCT_EVENTS = {
      CREATED: "product.created",
        UPDATED: "product.updated",
          DELETED: "product.deleted",
            ARCHIVED: "product.archived",
            } as const;

            export type ProductEvent =
              (typeof PRODUCT_EVENTS)[keyof typeof PRODUCT_EVENTS];
              