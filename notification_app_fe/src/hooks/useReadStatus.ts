"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "viewed-notification-ids";

export function useReadStatus() {
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setReadIds(new Set(JSON.parse(saved)));
      }
    } finally {
      setReady(true);
    }
  }, []);

  const save = useCallback((next: Set<string>) => {
    setReadIds(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
  }, []);

  const markAsRead = useCallback(
    (id: string) => {
      if (readIds.has(id)) return;
      const next = new Set(readIds);
      next.add(id);
      save(next);
    },
    [readIds, save]
  );

  const markAllAsRead = useCallback(
    (ids: string[]) => {
      const next = new Set(readIds);
      ids.forEach((id) => next.add(id));
      save(next);
    },
    [readIds, save]
  );

  const isRead = useCallback((id: string) => readIds.has(id), [readIds]);

  const countUnread = useCallback(
    (ids: string[]) => ids.filter((id) => !readIds.has(id)).length,
    [readIds]
  );

  return { ready, isRead, markAsRead, markAllAsRead, countUnread };
}
