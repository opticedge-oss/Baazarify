/**
 *  * -----------------------------------------
  * Baazarify Commerce OS
   * File: lib/tenant/index.ts
    * Module: BZR-0010
     * Purpose: Tenant Resolver
      * -----------------------------------------
       */

       import { headers } from "next/headers";

       export async function getTenant() {
         const headerList = await headers();

           const host = headerList.get("host") ?? "";

             const subdomain = host.split(".")[0];

               return {
                   host,
                       subdomain,
                         };
                         }
                         