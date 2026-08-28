export type PaymentMethod = "cod" | "bank_transfer" | "easypaisa" | "jazzcash";

export interface PaymentRequest {
  orderId: string;
  orderNumber: string;
  amount: number;
  customer: {
    name: string;
    email?: string;
    phone: string;
  };
  returnUrl: string;
}

export interface PaymentResult {
  status: "pending" | "requires_action";
  redirectUrl?: string;
  instructions?: string;
  providerReference?: string;
}

export interface PaymentProvider {
  method: PaymentMethod;
  isConfigured(): boolean;
  createPayment(request: PaymentRequest): Promise<PaymentResult>;
}