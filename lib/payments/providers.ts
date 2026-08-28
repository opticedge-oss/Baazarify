import type { PaymentMethod, PaymentProvider, PaymentRequest, PaymentResult } from "./types";

class ManualPaymentProvider implements PaymentProvider {
  constructor(
    public readonly method: "cod" | "bank_transfer",
    private readonly instructions: string
  ) {}

  isConfigured() {
    return true;
  }

  async createPayment(_request: PaymentRequest): Promise<PaymentResult> {
    return { status: "pending", instructions: this.instructions };
  }
}

class ConfiguredRedirectProvider implements PaymentProvider {
  constructor(
    public readonly method: "easypaisa" | "jazzcash",
    private readonly endpoint: string | undefined,
    private readonly merchantId: string | undefined
  ) {}

  isConfigured() {
    return Boolean(this.endpoint && this.merchantId);
  }

  async createPayment(request: PaymentRequest): Promise<PaymentResult> {
    if (!this.isConfigured()) {
      throw new Error(`${this.method} is not configured for this store`);
    }

    // Provider-specific signing and fields belong in this adapter.
    // The normalized checkout contract stays unchanged for the storefront.
    void request;
    return { status: "requires_action", redirectUrl: this.endpoint };
  }
}

const providers: Record<PaymentMethod, PaymentProvider> = {
  cod: new ManualPaymentProvider("cod", "Pay cash when your order arrives."),
  bank_transfer: new ManualPaymentProvider(
    "bank_transfer",
    process.env.BANK_TRANSFER_INSTRUCTIONS || "Bank transfer instructions will be shared after order confirmation."
  ),
  easypaisa: new ConfiguredRedirectProvider("easypaisa", process.env.EASYPAISA_CHECKOUT_URL, process.env.EASYPAISA_MERCHANT_ID),
  jazzcash: new ConfiguredRedirectProvider("jazzcash", process.env.JAZZCASH_CHECKOUT_URL, process.env.JAZZCASH_MERCHANT_ID),
};

export function getPaymentProvider(method: unknown) {
  return typeof method === "string" && method in providers
    ? providers[method as PaymentMethod]
    : undefined;
}

export function getAvailablePaymentMethods(): PaymentMethod[] {
  return (Object.keys(providers) as PaymentMethod[]).filter((method) => providers[method].isConfigured());
}