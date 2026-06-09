import "dotenv/config";
import cors from "cors";
import express from "express";
import { Log, setupLogger } from "logging_middleware";
import { startRefreshJob } from "./cron_job/refresh-job";
import { requestLogger } from "./handler/request-logger";
import { fetchAccessToken } from "./repository/auth-repository";
import notificationRoutes from "./route/notification-routes";

const app = express();
const port = Number(process.env.PORT ?? 4000);

setupLogger(fetchAccessToken);

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/notifications", notificationRoutes);

app.listen(port, async () => {
  startRefreshJob();
  await Log("backend", "info", "route", `Notification backend listening on port ${port}`);
});
