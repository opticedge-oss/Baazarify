import type { CoreEvent } from "./event-types";

/**
 * Every event listener in the platform
  * must implement this contract.
   */
   export interface EventListener<T = unknown> {
     /**
        * Handle an incoming event.
           */
             handle(event: CoreEvent<T>): void | Promise<void>;
             }
             