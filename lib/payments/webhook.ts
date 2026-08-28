import { createHmac, timingSafeEqual } from "node:crypto";
import type { PaymentMethod } from "./types";

const secrets: Partial<Record<PaymentMethod, string | undefined>> = {
  easypaisa: process.env.EASYPAISA_WEBHOOK_SECRET,
  jazzcash: process.env.JAZZCASH_WEBHOOK_SECRET,
};

export function verifyPaymentWebhook(
  method: PaymentMethod,
  rawBody: string,
  signature: string | null
) {
  const secret = secrets[method];
  if (!secret || !signature) return false;

  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const expectedBuffer = Buffer.from(expected, "utf8");
  const signatureBuffer = Buffer.from(signature, "utf8");
  return expectedBuffer.length === signatureBuffer.length && timingSafeEqual(expectedBuffer, signatureBuffer);
}