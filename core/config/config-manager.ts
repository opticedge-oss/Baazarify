import type { ConfigEntry } from "./config-types";
import type { ConfigProvider } from "./config-provider";

export class ConfigManager {
  private provider?: ConfigProvider;

    /**
       * Register the active configuration provider.
          */
            setProvider(provider: ConfigProvider): void {
                this.provider = provider;
                  }

                    /**
                       * Get configuration value.
                          */
                            get<T = unknown>(key: string): ConfigEntry<T> | undefined {
                                return this.provider?.get<T>(key);
                                  }

                                    /**
                                       * Save configuration value.
                                          */
                                            set<T = unknown>(entry: ConfigEntry<T>): void {
                                                this.provider?.set(entry);
                                                  }

                                                    /**
                                                       * Check configuration existence.
                                                          */
                                                            has(key: string): boolean {
                                                                return this.provider?.has(key) ?? false;
                                                                  }

                                                                    /**
                                                                       * Delete configuration.
                                                                          */
                                                                            delete(key: string): void {
                                                                                this.provider?.delete(key);
                                                                                  }

                                                                                    /**
                                                                                       * Get all configurations.
                                                                                          */
                                                                                            getAll(): ConfigEntry[] {
                                                                                                return this.provider?.getAll() ?? [];
                                                                                                  }
                                                                                                  }

                                                                                                  export const configManager = new ConfigManager();
                                                                                                  