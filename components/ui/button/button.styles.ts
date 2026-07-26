import { ButtonSize, ButtonVariant } from "./button.types";

export const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50";

  export const variantStyles: Record<ButtonVariant, string> = {
    primary:
        "bg-[var(--bzr-color-primary)] text-[var(--bzr-color-on-primary)] hover:opacity-90",

          secondary:
              "bg-[var(--bzr-color-secondary)] text-[var(--bzr-color-on-secondary)] hover:opacity-90",

                outline:
                    "border border-[var(--bzr-border-default)] bg-transparent text-[var(--bzr-text-primary)] hover:bg-[var(--bzr-surface-secondary)]",

                      ghost:
                          "bg-transparent text-[var(--bzr-text-primary)] hover:bg-[var(--bzr-surface-secondary)]",

                            destructive:
                                "bg-[var(--bzr-error)] text-white hover:opacity-90",

                                  success:
                                      "bg-[var(--bzr-success)] text-white hover:opacity-90",

                                        warning:
                                            "bg-[var(--bzr-warning)] text-black hover:opacity-90",

                                              link:
                                                  "bg-transparent underline-offset-4 hover:underline text-[var(--bzr-color-primary)]",
                                                  };

                                                  export const sizeStyles: Record<ButtonSize, string> = {
                                                    xs: "h-7 px-2 text-xs",

                                                      sm: "h-9 px-3 text-sm",

                                                        md: "h-10 px-4 text-sm",

                                                          lg: "h-11 px-6 text-base",

                                                            xl: "h-12 px-8 text-lg",
                                                            };
                                                            