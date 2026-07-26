/**
 * -----------------------------------------
 * Baazarify Commerce OS
 * File: lib/errors/app-error.ts
 * Module: BZR-0008
 * Purpose: Global Application Error Class
 * -----------------------------------------
 */

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode = 500,
    code = "INTERNAL_SERVER_ERROR",
    isOperational = true
  ) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}
