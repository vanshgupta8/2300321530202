export type NotificationType = "Placement" | "Result" | "Event";

export interface Notification {
  ID: string;
  Type: NotificationType;
  Message: string;
  Timestamp: string;
}

const typePriority: Record<NotificationType, number> = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export function getPriorityScore(item: Notification): number {
  const weight = typePriority[item.Type];
  const time = new Date(item.Timestamp).getTime();
  return weight * 1e15 + time;
}

export function isMoreImportant(a: Notification, b: Notification): boolean {
  return getPriorityScore(a) > getPriorityScore(b);
}

export function compareByPriority(a: Notification, b: Notification): number {
  return getPriorityScore(a) - getPriorityScore(b);
}
