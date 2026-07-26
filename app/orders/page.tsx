import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import OrderTable from "@/components/orders/OrderTable";

export default async function OrdersPage() {
  const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
          redirect("/login");
            }

              const { data: merchant } = await supabase
                  .from("merchants")
                      .select("tenant_id")
                          .eq("user_id", user.id)
                              .single();

                                if (!merchant) {
                                    redirect("/create-store");
                                      }

                                        const { data: orders } = await supabase
                                            .from("orders")
                                                .select("*")
                                                    .eq("tenant_id", merchant.tenant_id)
                                                        .order("created_at", { ascending: false });

                                                          return (
                                                              <div className="p-6">
                                                                    <div className="flex items-center justify-between mb-6">
                                                                            <div>
                                                                                      <h1 className="text-2xl font-bold text-white">Orders</h1>
                                                                                                <p className="text-zinc-400 mt-1">Manage your orders</p>
                                                                                                        </div>
                                                                                                                <Link
                                                                                                                          href="/orders/new"
                                                                                                                                    className="rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-black transition hover:bg-emerald-400"
                                                                                                                                            >
                                                                                                                                                      + New Order
                                                                                                                                                              </Link>
                                                                                                                                                                    </div>

                                                                                                                                                                          <OrderTable orders={orders || []} />
                                                                                                                                                                              </div>
                                                                                                                                                                                );
                                                                                                                                                                                }
                                                                                                                                                                                