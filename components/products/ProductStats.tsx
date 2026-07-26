type ProductStat = {
      title: string;
        value: string;
          subtitle: string;
            icon: string;
            };

            const stats: ProductStat[] = [
              {
                  title: "Total Products",
                      value: "542",
                          subtitle: "+18 this month",
                              icon: "📦",
                                },
                                  {
                                      title: "Active Products",
                                          value: "498",
                                              subtitle: "Currently selling",
                                                  icon: "🟢",
                                                    },
                                                      {
                                                          title: "Out of Stock",
                                                              value: "17",
                                                                  subtitle: "Needs restocking",
                                                                      icon: "⚠️",
                                                                        },
                                                                          {
                                                                              title: "Categories",
                                                                                  value: "24",
                                                                                      subtitle: "Organized catalog",
                                                                                          icon: "🏷️",
                                                                                            },
                                                                                            ];

                                                                                            export default function ProductStats() {
                                                                                              return (
                                                                                                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                                                                                                        {stats.map((stat) => (
                                                                                                                <div
                                                                                                                          key={stat.title}
                                                                                                                                    className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition-all duration-200 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10"
                                                                                                                                            >
                                                                                                                                                      <div className="flex items-center justify-between">
                                                                                                                                                                  <div>
                                                                                                                                                                                <p className="text-sm text-zinc-400">
                                                                                                                                                                                                {stat.title}
                                                                                                                                                                                                              </p>

                                                                                                                                                                                                                            <h2 className="mt-2 text-3xl font-bold text-white">
                                                                                                                                                                                                                                            {stat.value}
                                                                                                                                                                                                                                                          </h2>

                                                                                                                                                                                                                                                                        <p className="mt-2 text-sm text-emerald-400">
                                                                                                                                                                                                                                                                                        {stat.subtitle}
                                                                                                                                                                                                                                                                                                      </p>
                                                                                                                                                                                                                                                                                                                  </div>

                                                                                                                                                                                                                                                                                                                              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-3xl">
                                                                                                                                                                                                                                                                                                                                            {stat.icon}
                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                                                                ))}
                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                                                                                                                      