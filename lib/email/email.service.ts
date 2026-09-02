interface EmailParams {
  to: string;
  subject: string;
  html: string;
}

export class EmailService {
  static async sendOrderConfirmation(
    customerEmail: string,
    orderNumber: string,
    orderTotal: number,
    storeName: string
  ) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #059669;">Order Confirmed!</h1>
        <p>Thank you for your order at ${storeName}.</p>
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Order Number:</strong> ${orderNumber}</p>
          <p><strong>Total Amount:</strong> Rs. ${orderTotal.toLocaleString()}</p>
          <p><strong>Status:</strong> Pending</p>
        </div>
        <p>We will contact you shortly with shipping details.</p>
        <p>Thank you for your business!</p>
      </div>
    `;

    return EmailService.send({
      to: customerEmail,
      subject: `Order Confirmation: ${orderNumber}`,
      html,
    });
  }

  static async sendOrderShipped(
    customerEmail: string,
    orderNumber: string,
    trackingNumber?: string
  ) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #059669;">Your Order Has Shipped!</h1>
        <p>Your order ${orderNumber} is on its way.</p>
        ${trackingNumber ? `<p><strong>Tracking Number:</strong> ${trackingNumber}</p>` : ''}
        <p>Thank you for shopping with us!</p>
      </div>
    `;

    return EmailService.send({
      to: customerEmail,
      subject: `Your order ${orderNumber} has shipped`,
      html,
    });
  }

  static async sendOrderDelivered(
    customerEmail: string,
    orderNumber: string
  ) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #059669;">Order Delivered!</h1>
        <p>Your order ${orderNumber} has been delivered.</p>
        <p>We hope you love your purchase!</p>
        <p>Thank you for your business!</p>
      </div>
    `;

    return EmailService.send({
      to: customerEmail,
      subject: `Your order ${orderNumber} has been delivered`,
      html,
    });
  }

  private static async send(params: EmailParams) {
    // This is a placeholder - integrate with your email service
    // Options: SendGrid, Resend, Mailgun, AWS SES, etc.
    console.log('Email would be sent:', params);
    
    // For now, just log it
    return Promise.resolve({ success: true, messageId: 'local-' + Date.now() });
  }
}
