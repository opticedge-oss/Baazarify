/**
 * -----------------------------------------
 * Baazarify Commerce OS
 * File: lib/logger/index.ts
 * Module: BZR-0007
 * Purpose: Centralized Pino Logger
 * -----------------------------------------
 */

import pino from "pino";

export const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  transport:
    process.env.NODE_ENV !== "production"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        }
      : undefined,
  base: {
    application: "Baazarify",
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});
