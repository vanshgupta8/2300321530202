import { Log } from "logging_middleware";
import { clearTokenCache } from "../cache/token-cache";

let timer: NodeJS.Timeout | null = null;

// Clears the auth token every hour so a fresh one can be fetched.
export function startRefreshJob() {
  if (timer) {
    return;
  }

  timer = setInterval(() => {
    clearTokenCache();
    Log("backend", "info", "cron_job", "Auth token cache cleared").catch(() => undefined);
  }, 60 * 60 * 1000);
}

export function stopRefreshJob() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}
