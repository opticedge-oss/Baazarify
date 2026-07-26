interface NavItemProps {
      label: string;
        active?: boolean;
        }

        export default function NavItem({
          label,
            active = false,
            }: NavItemProps) {
              return (
                  <button
                        className={`
                                w-full
                                        flex
                                                items-center
                                                        rounded-xl
                                                                px-4
                                                                        py-3
                                                                                text-sm
                                                                                        transition-all

                                                                                                ${
                                                                                                          active
                                                                                                                      ? "bg-[var(--bzr-color-primary)] text-black font-semibold"
                                                                                                                                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                                                                                                                                          }
                                                                                                                                                `}
                                                                                                                                                    >
                                                                                                                                                          {label}
                                                                                                                                                              </button>
                                                                                                                                                                );
                                                                                                                                                                }
