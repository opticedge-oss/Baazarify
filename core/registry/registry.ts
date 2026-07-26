import { container } from "../container/container";

export class ServiceRegistry {
  register(name: string, service: unknown): void {
      container.register(name, service);
        }

          has(name: string): boolean {
              return container.has(name);
                }

                  resolve<T>(name: string): T {
                      return container.resolve<T>(name);
                        }
                        }

                        export const registry = new ServiceRegistry();
                        