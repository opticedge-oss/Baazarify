/**
 *  * -----------------------------------------
  * Baazarify Commerce OS
   * File: database/drizzle.config.ts
    * Module: BZR-0009
     * Purpose: Drizzle ORM Configuration
      * -----------------------------------------
       */

       import { defineConfig } from "drizzle-kit";

       export default defineConfig({
         schema: "./database/schema",
           out: "./database/migrations",
             dialect: "postgresql",

               dbCredentials: {
                   url: process.env.DATABASE_URL!,
                     },

                       verbose: true,
                         strict: true,
                         });
