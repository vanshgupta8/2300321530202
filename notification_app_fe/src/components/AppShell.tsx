"use client";

import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const links = [
  { href: "/", label: "All Notifications", icon: <InboxOutlinedIcon /> },
  { href: "/priority", label: "Priority Inbox", icon: <StarOutlineIcon /> },
];

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Toolbar sx={{ gap: 2, flexWrap: "wrap" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, flexGrow: 1 }}>
            Campus Notifications
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {links.map((link) => (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                startIcon={link.icon}
                size="small"
                variant={pathname === link.href ? "contained" : "outlined"}
              >
                {link.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
        {children}
      </Container>
    </Box>
  );
}
