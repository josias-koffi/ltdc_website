"use client";
import { createContext, useMemo } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { ThemeProvider } from "@mui/material/styles";
import { themeOptions } from "@/config/theming";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
export interface FrameInterface {
  paddingX: number | string;
  paddingY: number | string;
  paddingHeaderX: number | string;
  paddingHeaderY: number | string;
}

export const FrameSettingContext = createContext<FrameInterface | null>(null);
export const ScreenTypeContext = createContext<boolean | null>(null);

export default function Template({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const isUpperMobileScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const frame: FrameInterface = {
    paddingX: isUpperMobileScreen ? "13rem" : "1rem",
    paddingY: isUpperMobileScreen ? "7rem" : "1rem",
    paddingHeaderX: isUpperMobileScreen ? "13rem" : "1rem",
    paddingHeaderY: isUpperMobileScreen ? "2rem" : "1rem" ,
  };

  return (
    <ThemeProvider theme={themeOptions}>
      <FrameSettingContext.Provider value={frame}>
        <ScreenTypeContext.Provider value={isUpperMobileScreen}>
          <Header />
          {children}
          <Footer />
        </ScreenTypeContext.Provider>
      </FrameSettingContext.Provider>
    </ThemeProvider>
  );
}
