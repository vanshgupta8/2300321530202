import { Notification } from "../domain/notification";
import { fetchAccessToken } from "./auth-repository";

const API_URL = "http://4.224.186.213/evaluation-service/notifications";

interface ApiResponse {
  notifications: Notification[];
}

export async function getNotificationsPage(
  page = 1,
  limit = 50,
  notificationType?: string
) {
  const token = await fetchAccessToken();
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (notificationType) {
    params.set("notification_type", notificationType);
  }

  const response = await fetch(`${API_URL}?${params}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Notification API failed (${response.status}): ${body}`);
  }

  const data = (await response.json()) as ApiResponse;
  return data.notifications ?? [];
}

export async function getAllNotifications(notificationType?: string) {
  const all: Notification[] = [];
  let page = 1;
  const limit = 50;

  while (true) {
    const batch = await getNotificationsPage(page, limit, notificationType);
    if (batch.length === 0) {
      break;
    }

    all.push(...batch);

    if (batch.length < limit) {
      break;
    }

    page += 1;
  }

  return all;
}
