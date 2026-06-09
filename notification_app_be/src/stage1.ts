import "dotenv/config";
import { Log, setupLogger } from "logging_middleware";
import { fetchAccessToken } from "./repository/auth-repository";
import { getPriorityNotifications } from "./service/notification-service";

async function runStage1() {
  setupLogger(fetchAccessToken);

  await Log("backend", "info", "handler", "Stage 1 priority inbox run started");

  const result = await getPriorityNotifications(10);

  await Log(
    "backend",
    "info",
    "service",
    `Stage 1 completed with ${result.notifications.length} priority notifications`
  );

  const output = {
    stage: "Stage 1",
    totalFetched: result.totalFetched,
    topPriorityCount: result.notifications.length,
    topPriorityNotifications: result.notifications,
  };

  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
}

runStage1().catch(async (error: unknown) => {
  try {
    setupLogger(fetchAccessToken);
    const message = error instanceof Error ? error.message : "Stage 1 failed";
    await Log("backend", "error", "handler", message);
  } catch {
    // Ignore secondary logging errors.
  }

  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`Stage 1 failed: ${message}\n`);
  process.exit(1);
});
