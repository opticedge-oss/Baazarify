import type { Tenant } from "./tenant";

class TenantContext {
  private currentTenant:
      Tenant | null = null;

        set(
            tenant: Tenant | null
              ) {
                  this.currentTenant =
                        tenant;
                          }

                            get() {
                                return this.currentTenant;
                                  }

                                    clear() {
                                        this.currentTenant =
                                              null;
                                                }
                                                }

                                                export const tenantContext =
                                                  new TenantContext();
                                                  