import { configManager } from "./config-manager";
import type { ConfigEntry, ConfigScope } from "./config-types";

export class ConfigService {
  get<T = unknown>(key: string): T | undefined {
      return configManager.get<T>(key)?.value;
        }

          set<T = unknown>(
              key: string,
                  value: T,
                      scope: ConfigScope
                        ): void {
                            const entry: ConfigEntry<T> = {
                                  key,
                                        value,
                                              scope,
                                                  };

                                                      configManager.set(entry);
                                                        }

                                                          has(key: string): boolean {
                                                              return configManager.has(key);
                                                                }

                                                                  delete(key: string): void {
                                                                      configManager.delete(key);
                                                                        }

                                                                          getAll() {
                                                                              return configManager.getAll();
                                                                                }
                                                                                }

                                                                                export const configService = new ConfigService();
                                                                                