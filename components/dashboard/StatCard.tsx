type StatCardProps = {
      title: string;
        value: string;
          subtitle?: string;
            icon: string;
            };

            export default function StatCard({
              title,
                value,
                  subtitle,
                    icon,
                    }: StatCardProps) {
                      return (
                          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition-all duration-200 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10">
                                <div className="flex items-center justify-between">
                                        <div>
                                                  <p className="text-sm text-zinc-400">
                                                              {title}
                                                                        </p>

                                                                                  <h2 className="mt-2 text-3xl font-bold text-white">
                                                                                              {value}
                                                                                                        </h2>

                                                                                                                  {subtitle && (
                                                                                                                              <p className="mt-2 text-sm text-emerald-400">
                                                                                                                                            {subtitle}
                                                                                                                                                        </p>
                                                                                                                                                                  )}
                                                                                                                                                                          </div>

                                                                                                                                                                                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-3xl">
                                                                                                                                                                                            {icon}
                                                                                                                                                                                                    </div>
                                                                                                                                                                                                          </div>
                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                );
                                                                                                                                                                                                                }
