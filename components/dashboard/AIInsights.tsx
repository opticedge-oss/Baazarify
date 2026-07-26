type Insight = {
      icon: string;
        title: string;
          description: string;
          };

          const insights: Insight[] = [
            {
                icon: "📈",
                    title: "Sales Growth",
                        description: "Revenue increased by 18% compared to last week.",
                          },
                            {
                                icon: "⚠️",
                                    title: "Low Stock",
                                        description: "3 products are running low on inventory.",
                                          },
                                            {
                                                icon: "🚚",
                                                    title: "Pending Shipments",
                                                        description: "12 orders are waiting for courier pickup.",
                                                          },
                                                            {
                                                                icon: "💡",
                                                                    title: "AI Recommendation",
                                                                        description: "Run Meta Ads between 7 PM and 9 PM today.",
                                                                          },
                                                                          ];

                                                                          export default function AIInsights() {
                                                                            return (
                                                                                <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

                                                                                      <div className="mb-6 flex items-center gap-3">

                                                                                              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-2xl">
                                                                                                        🤖
                                                                                                                </div>

                                                                                                                        <div>
                                                                                                                                  <h2 className="text-xl font-bold text-white">
                                                                                                                                              AI Insights
                                                                                                                                                        </h2>

                                                                                                                                                                  <p className="text-sm text-zinc-400">
                                                                                                                                                                              Smart business recommendations
                                                                                                                                                                                        </p>
                                                                                                                                                                                                </div>

                                                                                                                                                                                                      </div>

                                                                                                                                                                                                            <div className="space-y-4">

                                                                                                                                                                                                                    {insights.map((item) => (
                                                                                                                                                                                                                              <div
                                                                                                                                                                                                                                          key={item.title}
                                                                                                                                                                                                                                                      className="rounded-xl border border-zinc-800 p-4"
                                                                                                                                                                                                                                                                >
                                                                                                                                                                                                                                                                            <div className="flex gap-4">

                                                                                                                                                                                                                                                                                          <div className="text-2xl">
                                                                                                                                                                                                                                                                                                          {item.icon}
                                                                                                                                                                                                                                                                                                                        </div>

                                                                                                                                                                                                                                                                                                                                      <div>

                                                                                                                                                                                                                                                                                                                                                      <h3 className="font-semibold text-white">
                                                                                                                                                                                                                                                                                                                                                                        {item.title}
                                                                                                                                                                                                                                                                                                                                                                                        </h3>

                                                                                                                                                                                                                                                                                                                                                                                                        <p className="mt-1 text-sm text-zinc-400">
                                                                                                                                                                                                                                                                                                                                                                                                                          {item.description}
                                                                                                                                                                                                                                                                                                                                                                                                                                          </p>

                                                                                                                                                                                                                                                                                                                                                                                                                                                        </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ))}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  