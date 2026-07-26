/**
 * -----------------------------------------
 * Baazarify Commerce OS
 * File: lib/errors/error-response.ts
 * Module: BZR-0008
 * Purpose: Standard API Error Response
 * -----------------------------------------
 */

import { NextResponse } from "next/server";
import { AppError } from "./app-error";

export function errorResponse(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: error.code,
          message: error.message,
        },
      },
      {
        status: error.statusCode,
      }
    );
  }

  return NextResponse.json(
    {
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred.",
      },
    },
    {
      status: 500,
    }
  );
}
