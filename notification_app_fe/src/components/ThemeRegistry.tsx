"use client";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ReactNode } from "react";

const theme = createTheme({
  palette: {
    primary: { main: "#1e4f91" },
    secondary: { main: "#2f8f4e" },
    background: { default: "#f3f6fa", paper: "#ffffff" },
  },
  shape: { borderRadius: 10 },
});

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
