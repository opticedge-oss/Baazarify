import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { TenantResolver } from "@/core/tenancy";
import { tenantContext } from "@/core/tenancy";

export async function middleware(
  request: NextRequest
  ) {
    // Resolve tenant
      const host =
          request.headers.get("host") || "";
          const tenant =
            request.nextUrl.searchParams.get(
                "tenant"
                  );

            const resolver =
                new TenantResolver();

                  if (tenant === "store1") {
                      tenantContext.set({
                          id: "tenant-1",
                              name: "Store 1",
                                  subdomain: "store1",
                                    });
                                    } else if (tenant === "store2") {
                                      tenantContext.set({
                                          id: "tenant-2",
                                              name: "Store 2",
                                                  subdomain: "store2",
                                                    });
                                                    } else {
                                                      resolver.resolve(host);
                                                    
                  }
                              console.log("HOST:", request.headers.get("host"));

                    // Existing Supabase session middleware
                      const response =
                          await updateSession(request);

                            return response;
                            }

                            export const config = {
                              matcher: [
                                  "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
                                    ],
                                    };
                                    