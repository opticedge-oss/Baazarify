export class Container {
    private static instance: Container;
      private services = new Map<string, unknown>();

        private constructor() {}

          static getInstance(): Container {
              if (!Container.instance) {
                    Container.instance = new Container();
                        }

                            return Container.instance;
                              }

                                register<T>(key: string, service: T): void {
                                    this.services.set(key, service);
                                      }

                                        resolve<T>(key: string): T {
                                            const service = this.services.get(key);

                                                if (!service) {
                                                      throw new Error(`Service "${key}" is not registered.`);
                                                          }

                                                              return service as T;
                                                                }

                                                                  has(key: string): boolean {
                                                                      return this.services.has(key);
                                                                        }

                                                                          remove(key: string): void {
                                                                              this.services.delete(key);
                                                                                }

                                                                                  clear(): void {
                                                                                      this.services.clear();
                                                                                        }
                                                                                        }

                                                                                        export const container = Container.getInstance();
                                                                                        