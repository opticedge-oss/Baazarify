/**
 *  * ==========================================
  * BZR Core Identity Roles
   * ==========================================
    */

    export const ROLES = {
      PLATFORM_OWNER: "platform.owner",
        PLATFORM_ADMIN: "platform.admin",

          MERCHANT_OWNER: "merchant.owner",
            MERCHANT_ADMIN: "merchant.admin",
              MERCHANT_MANAGER: "merchant.manager",

                MARKETING: "merchant.marketing",
                  SUPPORT: "merchant.support",
                    WAREHOUSE: "merchant.warehouse",
                      ACCOUNTANT: "merchant.accountant",
                        DEVELOPER: "merchant.developer",

                          CUSTOMER: "customer",

                            PLUGIN: "plugin",

                              AI_AGENT: "ai.agent",

                                API_KEY: "api.key",

                                  SERVICE_ACCOUNT: "service.account",
                                  } as const;

                                  export type Role =
                                    (typeof ROLES)[keyof typeof ROLES];
                                    