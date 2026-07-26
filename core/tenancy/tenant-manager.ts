import type { Tenant } from "./tenant";

export class TenantManager {
  private tenants: Tenant[] = [
      {
            id: "ub-products",
                  name: "UB Products",
                        subdomain: "ub",
                            },
                                {
                                      id: "rumi-emporium",
                                            name: "Rumi Emporium",
                                                  subdomain: "rumi",
                                                      },
                                                        ];

                                                          findBySubdomain(
                                                              subdomain: string
                                                                ): Tenant | undefined {
                                                                    return this.tenants.find(
                                                                          (tenant) =>
                                                                                  tenant.subdomain === subdomain
                                                                                      );
                                                                                        }

                                                                                          getAll(): Tenant[] {
                                                                                              return this.tenants;
                                                                                                }
                                                                                                }
                                                                                                