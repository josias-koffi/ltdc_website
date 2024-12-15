"use client";
import React, { createContext } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { themeOptions } from "@/config/theming";
import useMediaQuery from "@mui/material/useMediaQuery";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/fr";

dayjs.locale("fr");

export interface FrameInterface {
  paddingX: number | string;
  paddingY: number | string;
  paddingHeaderX: number | string;
  paddingHeaderY: number | string;
  upperSm: boolean;
  upperMd: boolean;
}

export const FrameSettingContext = createContext<FrameInterface | null>(null);
export const ScreenTypeContext = createContext<boolean | null>(null);

export default function Template({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const upperMdScreen = useMediaQuery(theme.breakpoints.up("md"));
  const upperMd = useMediaQuery(theme.breakpoints.up("xl"));

  const frame: FrameInterface = {
    paddingX: upperMdScreen ? "13rem" : "1rem",
    paddingY: upperMdScreen ? "7rem" : "1rem",
    paddingHeaderX: upperMdScreen ? "13rem" : "1rem",
    paddingHeaderY: upperMdScreen ? "2rem" : "1rem",
    upperSm: upperMdScreen,
    upperMd,
  };

  return (
    <ThemeProvider theme={themeOptions}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FrameSettingContext.Provider value={frame}>
          <ScreenTypeContext.Provider value={upperMdScreen}>
            <Header />
            {children}
            <Footer />
          </ScreenTypeContext.Provider>
        </FrameSettingContext.Provider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
