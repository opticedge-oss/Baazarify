"use client";

import {
  ResponsiveContainer,
    LineChart,
      Line,
        CartesianGrid,
          Tooltip,
            XAxis,
              YAxis,
              } from "recharts";

              const data = [
                { name: "Mon", sales: 12000 },
                  { name: "Tue", sales: 18000 },
                    { name: "Wed", sales: 15000 },
                      { name: "Thu", sales: 22000 },
                        { name: "Fri", sales: 26000 },
                          { name: "Sat", sales: 31000 },
                            { name: "Sun", sales: 28000 },
                            ];

                            export default function SalesChart() {
                              return (
                                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                                        <div className="mb-6">
                                                <h2 className="text-xl font-bold text-white">
                                                          Sales Analytics
                                                                  </h2>

                                                                          <p className="text-sm text-zinc-400">
                                                                                    Weekly revenue performance
                                                                                            </p>
                                                                                                  </div>

                                                                                                        <div className="h-80">
                                                                                                                <ResponsiveContainer width="100%" height="100%">
                                                                                                                          <LineChart data={data}>
                                                                                                                                      <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />

                                                                                                                                                  <XAxis
                                                                                                                                                                dataKey="name"
                                                                                                                                                                              stroke="#a1a1aa"
                                                                                                                                                                                          />

                                                                                                                                                                                                      <YAxis
                                                                                                                                                                                                                    stroke="#a1a1aa"
                                                                                                                                                                                                                                />

                                                                                                                                                                                                                                            <Tooltip />

                                                                                                                                                                                                                                                        <Line
                                                                                                                                                                                                                                                                      type="monotone"
                                                                                                                                                                                                                                                                                    dataKey="sales"
                                                                                                                                                                                                                                                                                                  stroke="#10b981"
                                                                                                                                                                                                                                                                                                                strokeWidth={3}
                                                                                                                                                                                                                                                                                                                              dot={{ r: 4 }}
                                                                                                                                                                                                                                                                                                                                            activeDot={{ r: 7 }}
                                                                                                                                                                                                                                                                                                                                                        />
                                                                                                                                                                                                                                                                                                                                                                  </LineChart>
                                                                                                                                                                                                                                                                                                                                                                          </ResponsiveContainer>
                                                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                                                                                                                      