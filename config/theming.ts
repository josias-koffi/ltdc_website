import { createTheme } from "@mui/material/styles";
import { Sen } from "next/font/google";
import { SeasonDefinition } from "@/config/seasons";

const sen = Sen({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  adjustFontFallback: false,
});

/**
 * Construit le thème MUI d'une saison. Les valeurs sont des hex réels (et non
 * des var(--ltdc-*)) car MUI en dérive les variantes light/dark et contrastText.
 */
export const buildTheme = (season: SeasonDefinition) =>
  createTheme({
    palette: {
      mode: "light",
      primary: {
        main: season.colors.primary,
      },
      secondary: {
        main: season.colors.accent,
        dark: season.colors.accentStrong,
        light: season.colors.accentSoft,
      },
      background: {
        default: season.colors.pageBackground,
      },
    },
    typography: {
      fontFamily: sen.style.fontFamily,
    },
  });
