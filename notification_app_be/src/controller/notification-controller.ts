import { Request, Response } from "express";
import { Log } from "logging_middleware";
import { getPriorityNotifications, listNotifications } from "../service/notification-service";
import { sendError } from "../handler/error-handler";

export async function getAllNotifications(req: Request, res: Response) {
  const started = Date.now();

  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 50);
    const type = req.query.notification_type as string | undefined;

    const notifications = await listNotifications(page, limit, type);

    await Log(
      "backend",
      "info",
      "controller",
      `Returned ${notifications.length} notifications in ${Date.now() - started}ms`
    );

    res.status(200).json({ notifications });
  } catch (error) {
    await sendError(res, error, "controller", "Failed to fetch notifications");
  }
}

export async function getPriorityInbox(req: Request, res: Response) {
  const started = Date.now();

  try {
    const top = Number(req.query.top ?? 10);
    const type = req.query.notification_type as string | undefined;
    const result = await getPriorityNotifications(top, type);

    await Log(
      "backend",
      "info",
      "controller",
      `Returned top ${result.notifications.length} priority notifications in ${Date.now() - started}ms`
    );

    res.status(200).json(result);
  } catch (error) {
    await sendError(res, error, "controller", "Failed to build priority inbox");
  }
}
