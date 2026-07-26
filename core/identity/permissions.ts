/**
 *  * ==========================================
  * BZR Core Permissions
   * ==========================================
    */

    export const PERMISSIONS = {
      /* Merchant */
        MERCHANT_READ: "merchant.read",
          MERCHANT_UPDATE: "merchant.update",
            MERCHANT_DELETE: "merchant.delete",

              /* Store */
                STORE_READ: "store.read",
                  STORE_UPDATE: "store.update",

                    /* Products */
                      PRODUCT_CREATE: "product.create",
                        PRODUCT_READ: "product.read",
                          PRODUCT_UPDATE: "product.update",
                            PRODUCT_DELETE: "product.delete",

                              /* Orders */
                                ORDER_CREATE: "order.create",
                                  ORDER_READ: "order.read",
                                    ORDER_UPDATE: "order.update",
                                      ORDER_DELETE: "order.delete",

                                        /* Customers */
                                          CUSTOMER_READ: "customer.read",
                                            CUSTOMER_UPDATE: "customer.update",

                                              /* Staff */
                                                STAFF_INVITE: "staff.invite",
                                                  STAFF_UPDATE: "staff.update",
                                                    STAFF_REMOVE: "staff.remove",

                                                      /* Billing */
                                                        BILLING_READ: "billing.read",
                                                          BILLING_UPDATE: "billing.update",

                                                            /* Analytics */
                                                              ANALYTICS_READ: "analytics.read",

                                                                /* Settings */
                                                                  SETTINGS_READ: "settings.read",
                                                                    SETTINGS_UPDATE: "settings.update",

                                                                      /* Apps & Plugins */
                                                                        APPS_INSTALL: "apps.install",
                                                                          APPS_REMOVE: "apps.remove",

                                                                            /* AI */
                                                                              AI_USE: "ai.use",
                                                                              } as const;

                                                                              export type Permission =
                                                                                (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
                                                                                