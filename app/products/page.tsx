import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import ProductListingTable from "@/components/products/ProductListingTable";

export default async function ProductsPage() {
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

                                        const { data: products } = await supabase
                                            .from("products")
                                                .select("*")
                                                    .eq("tenant_id", merchant.tenant_id)
                                                        .order("created_at", { ascending: false });

                                                          return (
                                                              <div className="p-6">
                                                                    <div className="flex items-center justify-between mb-6">
                                                                            <h1 className="text-2xl font-bold text-white">Products</h1>
                                                                                    <Link
                                                                                              href="/products/new"
                                                                                                        className="rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-black transition hover:bg-emerald-400"
                                                                                                                >
                                                                                                                          + Add Product
                                                                                                                                  </Link>
                                                                                                                                        </div>

                                                                                                                                              <ProductListingTable products={products || []} />
                                                                                                                                                  </div>
                                                                                                                                                    );
                                                                                                                                                    }
                                                                                                                                                    