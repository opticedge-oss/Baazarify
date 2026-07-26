import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AppShell from "@/components/layout/AppShell";
import DashboardPage from "@/components/dashboard/DashboardPage";

export default async function Dashboard() {
  const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
          redirect("/login");
            }

              // Fetch merchant data
                const { data: merchant } = await supabase
                    .from("merchants")
                        .select("*")
                            .eq("user_id", user.id)
                                .single();

                                  if (!merchant) {
                                      redirect("/create-store");
                                        }

                                          // Fetch real stats
                                            const { count: productCount } = await supabase
                                                .from("products")
                                                    .select("*", { count: "exact", head: true })
                                                        .eq("tenant_id", merchant.tenant_id);

                                                          const { count: orderCount } = await supabase
                                                              .from("orders")
                                                                  .select("*", { count: "exact", head: true })
                                                                      .eq("tenant_id", merchant.tenant_id);

                                                                        return (
                                                                            <AppShell storeName={merchant.store_name}>
                                                                                  <DashboardPage 
                                                                                          merchant={merchant}
                                                                                                  productCount={productCount || 0}
                                                                                                          orderCount={orderCount || 0}
                                                                                                                />
                                                                                                                    </AppShell>
                                                                                                                      );
                                                                                                                      }
                                                                                                                      