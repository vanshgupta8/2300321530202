// Notifications are not stored in a database for this task.
// This module exists only to keep the backend package layout complete.

export const storageMode = "remote-api-only" as const;

export function getStorageInfo() {
  return {
    mode: storageMode,
    note: "All notification data is fetched live from the evaluation API.",
  };
}
