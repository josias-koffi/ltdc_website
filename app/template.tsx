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
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import PopupSystem from "@/components/popup/PopupSystem";

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
  const upperMdScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const upperMd = useMediaQuery(theme.breakpoints.up("xl"));
  const pathname = usePathname();

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
            <AnimatePresence mode="wait">
              <motion.main
                key={pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {children}
              </motion.main>
            </AnimatePresence>
            <Footer />
            <PopupSystem />
          </ScreenTypeContext.Provider>
        </FrameSettingContext.Provider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
