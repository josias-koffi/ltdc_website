"use client";

import { useContext } from "react";
import {
  SeasonContext,
  SeasonContextValue,
} from "@/components/theme/SeasonalThemeProvider";

/** Accès à l'habillage saisonnier courant (logos, palette, bascule). */
const useSeason = (): SeasonContextValue => {
  const context = useContext(SeasonContext);
  if (!context) {
    throw new Error("useSeason doit être utilisé à l'intérieur de SeasonalThemeProvider");
  }
  return context;
};

export default useSeason;
