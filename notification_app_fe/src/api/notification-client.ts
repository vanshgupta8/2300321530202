import { NotificationItem, NotificationType } from "./types";

function buildQuery(type: NotificationType, mode?: "priority", top = 10) {
  const params = new URLSearchParams();

  if (mode === "priority") {
    params.set("mode", "priority");
    params.set("top", String(top));
  } else {
    params.set("limit", "50");
    params.set("page", "1");
  }

  if (type !== "All") {
    params.set("notification_type", type);
  }

  return params.toString();
}

export async function fetchNotifications(type: NotificationType = "All") {
  const query = buildQuery(type);
  const response = await fetch(`/api/notifications?${query}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? "Could not load notifications");
  }

  return (data.notifications ?? []) as NotificationItem[];
}

export async function fetchPriorityNotifications(type: NotificationType = "All", top = 10) {
  const query = buildQuery(type, "priority", top);
  const response = await fetch(`/api/notifications?${query}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? "Could not load priority notifications");
  }

  return (data.notifications ?? []) as NotificationItem[];
}
