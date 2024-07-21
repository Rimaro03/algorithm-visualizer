'use client'
import * as React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import "@/styles/globals.css"
import MenuAppBar from "@/components/AppBar/AppBar";
import { createTheme, Theme, ThemeProvider } from "@mui/material";
import myTheme from "@/styles/theme";

const inter = Inter({ subsets: ["latin"] });
const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        ...myTheme,
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <MenuAppBar colorMode={colorMode} />
              <main>{children}</main>
            </ThemeProvider>
          </ColorModeContext.Provider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}