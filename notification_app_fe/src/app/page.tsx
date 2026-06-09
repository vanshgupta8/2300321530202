"use client";

import { fetchNotifications } from "@/api/notification-client";
import { NotificationItem, NotificationType } from "@/api/types";
import AppShell from "@/components/AppShell";
import NotificationPanel from "@/components/NotificationPanel";
import { useCallback, useEffect, useState } from "react";

export default function HomePage() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<NotificationType>("All");

  const loadData = useCallback(async (type: NotificationType) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchNotifications(type);
      setItems(data);
    } catch (err) {
      setItems([]);
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData(selectedType);
  }, [loadData, selectedType]);

  return (
    <AppShell>
      <NotificationPanel
        title="All Notifications"
        subtitle="Tap a card to mark it as viewed."
        items={items}
        loading={loading}
        error={error}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />
    </AppShell>
  );
}
