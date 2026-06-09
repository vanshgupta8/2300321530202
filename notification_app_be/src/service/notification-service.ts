import { PriorityInbox } from "../domain/priority-inbox";
import { getAllNotifications, getNotificationsPage } from "../repository/notification-repository";

export async function listNotifications(
  page = 1,
  limit = 50,
  notificationType?: string
) {
  return getNotificationsPage(page, limit, notificationType);
}

export async function getPriorityNotifications(top = 10, notificationType?: string) {
  const allItems = await getAllNotifications(notificationType);
  const inbox = new PriorityInbox(top);
  inbox.addMany(allItems);

  return {
    totalFetched: allItems.length,
    notifications: inbox.getTopList(),
  };
}
