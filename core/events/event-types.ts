/**
 *  * BZR Core Event Name
  * All platform events must follow:
   * domain.action
    *
     * Example:
      * product.created
       * order.paid
        * merchant.created
         */

         export type EventName =
           | "merchant.created"
             | "merchant.updated"
               | "store.created"
                 | "store.updated"
                   | "product.created"
                     | "product.updated"
                       | "product.deleted"
                         | "order.created"
                           | "order.paid"
                             | "order.shipped";

                             /**
                              * Base Event Contract
                               */

                               export interface CoreEvent<T = unknown> {
                                 name: EventName;
                                   payload: T;
                                     timestamp: Date;
                                     }
                                     