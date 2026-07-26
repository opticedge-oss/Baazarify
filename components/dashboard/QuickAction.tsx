import Link from "next/link";

type QuickActionProps = {
  title: string;
    description: string;
      href: string;
        icon: string;
        };

        export default function QuickAction({
          title,
            description,
              href,
                icon,
                }: QuickActionProps) {
                  return (
                      <Link
                            href={href}
                                  className="
                                          block
                                                  rounded-2xl
                                                          border
                                                                  border-zinc-800
                                                                          bg-zinc-900
                                                                                  p-5
                                                                                          transition-all
                                                                                                  duration-200
                                                                                                          hover:border-emerald-500
                                                                                                                  hover:-translate-y-1
                                                                                                                          hover:shadow-lg
                                                                                                                                  hover:shadow-emerald-500/10
                                                                                                                                        "
                                                                                                                                            >
                                                                                                                                                  <div className="mb-4 text-3xl">
                                                                                                                                                          {icon}
                                                                                                                                                                </div>

                                                                                                                                                                      <h3 className="text-lg font-semibold text-white">
                                                                                                                                                                              {title}
                                                                                                                                                                                    </h3>

                                                                                                                                                                                          <p className="mt-2 text-sm text-zinc-400">
                                                                                                                                                                                                  {description}
                                                                                                                                                                                                        </p>
                                                                                                                                                                                                            </Link>
                                                                                                                                                                                                              );
                                                                                                                                                                                                              }
                                                                                                                                                                                                              