import React from "react";

import { ButtonProps } from "./button.types";
import {
  baseStyles,
    variantStyles,
      sizeStyles,
      } from "./button.styles";

      export default function Button({
        variant = "primary",
          size = "md",
            loading = false,
              fullWidth = false,
                leftIcon,
                  rightIcon,
                    children,
                      className = "",
                        disabled,
                          ...props
                          }: ButtonProps) {
                            const classes = [
                                baseStyles,
                                    variantStyles[variant],
                                        sizeStyles[size],
                                            fullWidth ? "w-full" : "",
                                                className,
                                                  ]
                                                      .filter(Boolean)
                                                          .join(" ");

                                                            return (
                                                                <button
                                                                      className={classes}
                                                                            disabled={disabled || loading}
                                                                                  aria-disabled={disabled || loading}
                                                                                        aria-busy={loading}
                                                                                              {...props}
                                                                                                  >
                                                                                                        {!loading && leftIcon}

                                                                                                              {loading && (
                                                                                                                      <span
                                                                                                                                className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                                                                                                                                          aria-hidden="true"
                                                                                                                                                  />
                                                                                                                                                        )}

                                                                                                                                                              <span>{children}</span>

                                                                                                                                                                    {!loading && rightIcon}
                                                                                                                                                                        </button>
                                                                                                                                                                          );
                                                                                                                                                                          }
                                                                                                                                                                          