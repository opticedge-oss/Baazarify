/**
 *  * ==========================================
  * BZR Core Configuration Types
   * ==========================================
    */

    export type ConfigScope =
      | "system"
        | "merchant"
          | "store"
            | "runtime";

            export interface ConfigEntry<T = unknown> {
              key: string;
                value: T;
                  scope: ConfigScope;
                  }

                  export interface ConfigMap {
                    [key: string]: ConfigEntry;
                    }
                    