import { Response } from "express";
import { Log, LogPackage } from "logging_middleware";

export async function sendError(
  res: Response,
  error: unknown,
  pkg: LogPackage,
  fallbackMessage: string
) {
  const message = error instanceof Error ? error.message : fallbackMessage;

  try {
    await Log("backend", "error", pkg, message);
  } catch {
    // If logging itself fails, still return the API error.
  }

  res.status(500).json({ error: message });
}
