"use client";
import React, {createContext} from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import {ThemeProvider, useTheme} from "@mui/material/styles";
import {themeOptions} from "@/config/theming";
import useMediaQuery from "@mui/material/useMediaQuery";

export interface FrameInterface {
    paddingX: number | string;
    paddingY: number | string;
    paddingHeaderX: number | string;
    paddingHeaderY: number | string;
    upperSm: boolean,
    upperMd: boolean,
}

export const FrameSettingContext = createContext<FrameInterface | null>(null);
export const ScreenTypeContext = createContext<boolean | null>(null);

export default function Template({children}: { children: React.ReactNode }) {
    const theme = useTheme();
    const upperSm = useMediaQuery(theme.breakpoints.up("sm"));
    const upperMd = useMediaQuery(theme.breakpoints.up("xl"));


    const frame: FrameInterface = {
        paddingX: upperSm ? "13rem" : "1rem",
        paddingY: upperSm ? "7rem" : "1rem",
        paddingHeaderX: upperSm ? "13rem" : "1rem",
        paddingHeaderY: upperSm ? "2rem" : "1rem",
        upperSm,
        upperMd
    };

    return (
        <ThemeProvider theme={themeOptions}>
            <FrameSettingContext.Provider value={frame}>
                <ScreenTypeContext.Provider value={upperSm}>
                    <Header/>
                    {children}
                    <Footer/>
                </ScreenTypeContext.Provider>
            </FrameSettingContext.Provider>
        </ThemeProvider>
    );
}
