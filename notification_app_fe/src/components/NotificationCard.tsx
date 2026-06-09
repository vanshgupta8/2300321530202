"use client";

import { NotificationItem } from "@/api/types";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

const colors = {
  Placement: "success",
  Result: "primary",
  Event: "warning",
} as const;

const icons = {
  Placement: <WorkIcon fontSize="small" />,
  Result: <SchoolIcon fontSize="small" />,
  Event: <EventIcon fontSize="small" />,
};

export default function NotificationCard({
  item,
  isRead,
  onOpen,
  highlight = false,
}: {
  item: NotificationItem;
  isRead: boolean;
  onOpen: (id: string) => void;
  highlight?: boolean;
}) {
  return (
    <Card
      variant="outlined"
      sx={{
        borderLeft: 5,
        borderLeftColor: `${colors[item.Type]}.main`,
        bgcolor: isRead ? "background.paper" : "action.hover",
        boxShadow: highlight ? 3 : 0,
      }}
    >
      <CardActionArea onClick={() => onOpen(item.ID)}>
        <CardContent>
          <Stack spacing={1.2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
              <Chip icon={icons[item.Type]} label={item.Type} color={colors[item.Type]} size="small" />
              <Typography variant="caption" color="text.secondary">
                {item.Timestamp}
              </Typography>
            </Stack>
            <Typography variant="subtitle1" fontWeight={600}>
              {item.Message}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip label={isRead ? "Viewed" : "New"} color={isRead ? "default" : "secondary"} size="small" />
              {highlight ? <Chip label="Priority" color="error" size="small" variant="outlined" /> : null}
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
