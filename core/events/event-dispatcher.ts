import type { CoreEvent, EventName } from "./event-types";
import type { EventListener } from "./event-listener";

export class EventDispatcher {
  private readonly listeners = new Map<
      EventName,
          EventListener[]
            >();

              register(
                  event: EventName,
                      listener: EventListener
                        ): void {
                            const current = this.listeners.get(event) ?? [];

                                current.push(listener);

                                    this.listeners.set(event, current);
                                      }

                                        async dispatch(
                                            event: CoreEvent
                                              ): Promise<void> {
                                                  const listeners =
                                                        this.listeners.get(event.name);

                                                            if (!listeners?.length) {
                                                                  return;
                                                                      }

                                                                          for (const listener of listeners) {
                                                                                await listener.handle(event);
                                                                                    }
                                                                                      }

                                                                                        clear(): void {
                                                                                            this.listeners.clear();
                                                                                              }
                                                                                              }

                                                                                              export const dispatcher =
                                                                                                new EventDispatcher();
                                                                                                