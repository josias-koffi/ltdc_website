import { createTheme } from "@mui/material/styles";
import { Sen } from "next/font/google";

const sen = Sen({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  adjustFontFallback: false,
});

export const themeOptions: any = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#642775",
    },
    secondary: {
      main: "#EDA26B",
    },
  },
  typography: {
    fontFamily: sen.style.fontFamily,
  },
});
