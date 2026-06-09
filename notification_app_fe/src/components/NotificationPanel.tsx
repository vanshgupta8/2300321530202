"use client";

import { NotificationItem, NotificationType } from "@/api/types";
import { useReadStatus } from "@/hooks/useReadStatus";
import { Alert, Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import NotificationCard from "./NotificationCard";
import TypeFilter from "./TypeFilter";

export default function NotificationPanel({
  title,
  subtitle,
  items,
  loading,
  error,
  selectedType,
  onTypeChange,
  highlight = false,
}: {
  title: string;
  subtitle: string;
  items: NotificationItem[];
  loading: boolean;
  error: string | null;
  selectedType: NotificationType;
  onTypeChange: (value: NotificationType) => void;
  highlight?: boolean;
}) {
  const { ready, isRead, markAsRead, markAllAsRead, countUnread } = useReadStatus();

  const visibleItems = useMemo(() => {
    if (selectedType === "All") return items;
    return items.filter((item) => item.Type === selectedType);
  }, [items, selectedType]);

  if (!ready) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Stack spacing={3}>
      <Box>
        <Typography variant="h4" fontWeight={700}>
          {title}
        </Typography>
        <Typography color="text.secondary" mt={0.5}>
          {subtitle}
        </Typography>
      </Box>

      <TypeFilter value={selectedType} onChange={onTypeChange} />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems="center">
        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
          Showing {visibleItems.length} notifications • {countUnread(visibleItems.map((item) => item.ID))} new
        </Typography>
        <Button
          size="small"
          variant="outlined"
          disabled={visibleItems.length === 0}
          onClick={() => markAllAsRead(visibleItems.map((item) => item.ID))}
        >
          Mark all as viewed
        </Button>
      </Stack>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : null}

      {error ? <Alert severity="error">{error}</Alert> : null}

      {!loading && !error && visibleItems.length === 0 ? (
        <Alert severity="info">No notifications found for this filter.</Alert>
      ) : null}

      <Stack spacing={2}>
        {visibleItems.map((item) => (
          <NotificationCard
            key={item.ID}
            item={item}
            isRead={isRead(item.ID)}
            onOpen={markAsRead}
            highlight={highlight}
          />
        ))}
      </Stack>
    </Stack>
  );
}
