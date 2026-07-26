import { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
    | "secondary"
      | "outline"
        | "ghost"
          | "destructive"
            | "success"
              | "warning"
                | "link";

                export type ButtonSize =
                  | "xs"
                    | "sm"
                      | "md"
                        | "lg"
                          | "xl";

                          export interface ButtonProps
                            extends ButtonHTMLAttributes<HTMLButtonElement> {
                              /**
                                 * Visual style
                                    */
                                      variant?: ButtonVariant;

                                        /**
                                           * Button size
                                              */
                                                size?: ButtonSize;

                                                  /**
                                                     * Loading state
                                                        */
                                                          loading?: boolean;

                                                            /**
                                                               * Full width button
                                                                  */
                                                                    fullWidth?: boolean;

                                                                      /**
                                                                         * Left icon
                                                                            */
                                                                              leftIcon?: ReactNode;

                                                                                /**
                                                                                   * Right icon
                                                                                      */
                                                                                        rightIcon?: ReactNode;

                                                                                          /**
                                                                                             * Button content
                                                                                                */
                                                                                                  children: ReactNode;
                                                                                                  }
                                                                                                  