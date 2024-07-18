"use client";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import {ThemeProvider} from '@mui/material/styles';
import {themeOptions} from "@/config/theming";


export default function Template({children}: { children: React.ReactNode }) {


    return <ThemeProvider theme={themeOptions}>
        <Header/>
        {children}
        <Footer/>
    </ThemeProvider>;
}
