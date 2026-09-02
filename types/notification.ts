export type NotificationType = 'order_created' | 'order_shipped' | 'order_delivered' | 'payment_received';

export interface Notification {
  id?: string;
  tenant_id: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  created_at?: string;
}

export interface NotificationPreferences {
  tenant_id: string;
  email_on_order: boolean;
  email_on_shipment: boolean;
  email_on_delivery: boolean;
  sms_enabled: boolean;
}
