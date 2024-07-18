"use client";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import {ThemeProvider} from '@mui/material/styles';
import {themeOptions} from "@/config/theming";
import {Box} from "@mui/material";


export default function Template({children}: { children: React.ReactNode }) {


    return <ThemeProvider theme={themeOptions}>
        <Header/>
        <Box px={7} py={5}>
            {children}
        </Box>
        <Footer/>
    </ThemeProvider>;
}
