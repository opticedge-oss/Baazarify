import { dispatcher } from "./event-dispatcher";
import type { CoreEvent, EventName } from "./event-types";
import type { EventListener } from "./event-listener";

export class EventBus {
  on(
      event: EventName,
          listener: EventListener
            ): void {
                dispatcher.register(event, listener);
                  }

                    async emit(
                        event: CoreEvent
                          ): Promise<void> {
                              await dispatcher.dispatch(event);
                                }
                                }

                                export const eventBus = new EventBus();
                                