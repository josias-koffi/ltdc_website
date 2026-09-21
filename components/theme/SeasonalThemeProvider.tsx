"use client";

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Alert, Snackbar } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { buildTheme } from "@/config/theming";
import {
  getSeason,
  isSeasonKey,
  resolveSeasonByDate,
  SeasonDefinition,
  SeasonKey,
} from "@/config/seasons";
import {
  SEASON_QUERY_PARAM,
  SEASON_STORAGE_KEY,
} from "@/config/seasonBootstrap";
import useSeasonEasterEgg from "@/hooks/useSeasonEasterEgg";

export interface SeasonContextValue {
  season: SeasonDefinition;
  seasonKey: SeasonKey;
  /** Force une saison. "default" efface l'override et rend la main au calendrier. */
  setSeason: (key: SeasonKey) => void;
  /** true si la saison affichée vient d'un override et non du calendrier. */
  isOverridden: boolean;
}

export const SeasonContext = createContext<SeasonContextValue | null>(null);

/** Saison forcée via l'URL (prioritaire) ou le stockage local. */
const readOverride = (): SeasonKey | null => {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get(SEASON_QUERY_PARAM);
    if (isSeasonKey(fromUrl)) {
      return fromUrl;
    }
    const stored = window.localStorage.getItem(SEASON_STORAGE_KEY);
    return isSeasonKey(stored) ? stored : null;
  } catch {
    // localStorage indisponible (navigation privée, cookies bloqués).
    return null;
  }
};

const SeasonalThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Le rendu serveur est prérendu au build : il ne peut pas connaître la date
  // de visite. On part donc du thème par défaut, et la saison réelle est
  // résolue à l'hydratation. Les couleurs, elles, sont déjà correctes grâce au
  // script de bootstrap (cf. config/seasonBootstrap.ts).
  const [seasonKey, setSeasonKey] = useState<SeasonKey>("default");
  const [isOverridden, setIsOverridden] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);
  const defaultFaviconRef = useRef<string | null>(null);

  const season = useMemo(() => getSeason(seasonKey), [seasonKey]);
  const theme = useMemo(() => buildTheme(season), [season]);

  const setSeason = useCallback((key: SeasonKey) => {
    try {
      if (key === "default") {
        // On efface l'override pour rendre la main au calendrier plutôt que de
        // figer le thème par défaut.
        window.localStorage.removeItem(SEASON_STORAGE_KEY);
      } else {
        window.localStorage.setItem(SEASON_STORAGE_KEY, key);
      }
    } catch {
      // Persistance impossible : la bascule reste valable pour la session.
    }
    const applied = key === "default" ? resolveSeasonByDate(new Date()) : key;
    setSeasonKey(applied);
    setIsOverridden(key !== "default");
    setToast(
      key === "default"
        ? `Habillage réinitialisé (${getSeason(applied).label})`
        : `${getSeason(applied).label} activé`,
    );
  }, []);

  // Résolution à l'hydratation : override sinon calendrier.
  useEffect(() => {
    const override = readOverride();
    setSeasonKey(override ?? resolveSeasonByDate(new Date()));
    setIsOverridden(override !== null);
  }, []);

  // Pilote les variables CSS de app/globals.css.
  useEffect(() => {
    document.documentElement.dataset.season = seasonKey;
  }, [seasonKey]);

  // Le favicon est un fichier statique côté Next : on le permute à chaud.
  useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!link) {
      return;
    }
    if (defaultFaviconRef.current === null) {
      defaultFaviconRef.current = link.href;
    }
    link.href =
      seasonKey === "default" ? defaultFaviconRef.current : season.logos.favicon;
  }, [seasonKey, season.logos.favicon]);

  useSeasonEasterEgg(setSeason);

  const value = useMemo<SeasonContextValue>(
    () => ({ season, seasonKey, setSeason, isOverridden }),
    [season, seasonKey, setSeason, isOverridden],
  );

  return (
    <SeasonContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        {children}
        <Snackbar
          open={toast !== null}
          autoHideDuration={3000}
          onClose={() => setToast(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity="success" variant="filled" onClose={() => setToast(null)}>
            {toast}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </SeasonContext.Provider>
  );
};

export default SeasonalThemeProvider;
