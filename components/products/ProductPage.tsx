import ProductStats from "./ProductStats";
import ProductToolbar from "./ProductToolbar";
import ProductTable from "./ProductTable";

export default function ProductPage() {
  return (
      <div className="space-y-8">

            {/* Header */}
                  <div>
                          <h1 className="text-3xl font-bold text-white">
                                    Products
                                            </h1>

                                                    <p className="mt-2 text-zinc-400">
                                                              Manage your products, inventory and catalog.
                                                                      </p>
                                                                            </div>

                                                                                  {/* Stats */}
                                                                                        <ProductStats />

                                                                                              {/* Toolbar */}
                                                                                                    <ProductToolbar />

                                                                                                          {/* Table */}
                                                                                                                <ProductTable />

                                                                                                                    </div>
                                                                                                                      );
                                                                                                                      }
                                                                                                                      