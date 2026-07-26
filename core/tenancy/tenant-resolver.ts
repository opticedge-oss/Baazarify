import { TenantManager } from "./tenant-manager";
import { tenantContext } from "./tenant-context";
import type { Tenant } from "./tenant";

export class TenantResolver {
  private manager =
      new TenantManager();

        resolve(
            host: string
              ): Tenant | null {
                  const subdomain =
                        host.split(".")[0];

                            const tenant =
                                  this.manager.findBySubdomain(
                                          subdomain
                                                );

                                                    if (tenant) {
                                                          tenantContext.set(
                                                                  tenant
                                                                        );

                                                                              return tenant;
                                                                                  }

                                                                                      tenantContext.clear();

                                                                                          return null;
                                                                                            }
                                                                                            }
                                                                                            