import type { ConfigEntry } from "./config-types";

/**
 * Every configuration source
  * must implement this contract.
   */
   export interface ConfigProvider {
     /**
        * Return a configuration value.
           */
             get<T = unknown>(key: string): ConfigEntry<T> | undefined;

               /**
                  * Save or update a configuration value.
                     */
                       set<T = unknown>(entry: ConfigEntry<T>): void;

                         /**
                            * Check whether a configuration exists.
                               */
                                 has(key: string): boolean;

                                   /**
                                      * Remove a configuration.
                                         */
                                           delete(key: string): void;

                                             /**
                                                * Return all configurations.
                                                   */
                                                     getAll(): ConfigEntry[];
                                                     }
                                                     