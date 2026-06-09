export type LogStack = "backend" | "frontend";
export type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";
export type LogPackage =
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style"
  | "auth"
  | "config"
  | "middleware"
  | "utils"
  | "handler"
  | "db"
  | "cache"
  | "controller"
  | "service"
  | "repository"
  | "route"
  | "cron_job"
  | "domain";

const LOGS_URL = "http://4.224.186.213/evaluation-service/logs";

let tokenProvider: (() => Promise<string>) | null = null;

export function setupLogger(getToken: () => Promise<string>) {
  tokenProvider = getToken;
}

export async function Log(
  stack: LogStack,
  level: LogLevel,
  pkg: LogPackage,
  message: string
) {
  if (!tokenProvider) {
    throw new Error("Logger is not configured yet. Call setupLogger() first.");
  }

  const token = await tokenProvider();

  const response = await fetch(LOGS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      stack,
      level,
      package: pkg,
      message,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Could not send log (${response.status}): ${body}`);
  }

  return response.json();
}
