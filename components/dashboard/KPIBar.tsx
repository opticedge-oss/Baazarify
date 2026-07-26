type KPI = {
      title: string;
        value: string;
          trend: string;
          };

          const kpis: KPI[] = [
            {
                title: "Revenue",
                    value: "Rs. 245K",
                        trend: "+18%",
                          },
                            {
                                title: "Orders",
                                    value: "1,248",
                                        trend: "+12%",
                                          },
                                            {
                                                title: "Conversion",
                                                    value: "4.8%",
                                                        trend: "+5%",
                                                          },
                                                            {
                                                                title: "AOV",
                                                                    value: "Rs. 3,240",
                                                                        trend: "+9%",
                                                                          },
                                                                          ];

                                                                          export default function KPIBar() {
                                                                            return (
                                                                                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                                                                                      {kpis.map((item) => (
                                                                                              <div
                                                                                                        key={item.title}
                                                                                                                  className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
                                                                                                                          >
                                                                                                                                    <p className="text-sm text-zinc-400">
                                                                                                                                                {item.title}
                                                                                                                                                          </p>

                                                                                                                                                                    <div className="mt-2 flex items-end justify-between">
                                                                                                                                                                                <h3 className="text-2xl font-bold text-white">
                                                                                                                                                                                              {item.value}
                                                                                                                                                                                                          </h3>

                                                                                                                                                                                                                      <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-xs font-semibold text-emerald-400">
                                                                                                                                                                                                                                    {item.trend}
                                                                                                                                                                                                                                                </span>
                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                        ))}
                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                              );
                                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                              