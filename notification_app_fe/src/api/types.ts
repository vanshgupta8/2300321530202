export type NotificationType = "Placement" | "Result" | "Event" | "All";

export interface NotificationItem {
  ID: string;
  Type: Exclude<NotificationType, "All">;
  Message: string;
  Timestamp: string;
}
