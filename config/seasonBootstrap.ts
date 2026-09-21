import { SEASON_KEYS, SEASONS } from "@/config/seasons";

export const SEASON_STORAGE_KEY = "ltdc_season";
export const SEASON_QUERY_PARAM = "theme";

/** Fenêtres sérialisées pour le script inline, dérivées de la même source. */
const WINDOWS = SEASON_KEYS.filter((key) => SEASONS[key].window !== null).map((key) => {
  const { start, end } = SEASONS[key].window!;
  return { k: key, s: start[0] * 100 + start[1], e: end[0] * 100 + end[1] };
});

/**
 * Pose data-season sur <html> avant le premier paint, pour que les variables
 * CSS de globals.css s'appliquent sans flash de la palette par défaut.
 *
 * Duplique volontairement la logique de resolveSeasonByDate : le script doit
 * s'exécuter avant tout bundle JS. Les fenêtres, elles, restent générées à
 * partir de config/seasons.ts pour éviter toute divergence de valeurs.
 */
export const SEASON_BOOTSTRAP_SCRIPT = `
(function () {
  try {
    var keys = ${JSON.stringify(SEASON_KEYS)};
    var windows = ${JSON.stringify(WINDOWS)};
    var forced = new URLSearchParams(location.search).get(${JSON.stringify(SEASON_QUERY_PARAM)})
      || localStorage.getItem(${JSON.stringify(SEASON_STORAGE_KEY)});
    var season = keys.indexOf(forced) !== -1 ? forced : null;
    if (!season) {
      var now = new Date();
      var today = (now.getMonth() + 1) * 100 + now.getDate();
      for (var i = 0; i < windows.length; i++) {
        var w = windows[i];
        if (w.s <= w.e ? (today >= w.s && today <= w.e) : (today >= w.s || today <= w.e)) {
          season = w.k;
          break;
        }
      }
    }
    document.documentElement.setAttribute("data-season", season || "default");
  } catch (e) {
    document.documentElement.setAttribute("data-season", "default");
  }
})();
`;
