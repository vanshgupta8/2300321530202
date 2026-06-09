import { NextFunction, Request, Response } from "express";
import { Log } from "logging_middleware";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const started = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - started;
    const message = `${req.method} ${req.path} -> ${res.statusCode} (${duration}ms)`;

    Log("backend", "info", "middleware", message).catch(() => {
      // Avoid crashing the request cycle if remote logging is down.
    });
  });

  next();
}
