/**
 * Habillages saisonniers du site (logos + palette).
 *
 * Source de vérité unique, sans dépendance React : ce module est importable
 * aussi bien côté serveur (rendu initial) que côté client (bascule à chaud).
 *
 * Pour ajouter une opération : déclarer une entrée dans SEASONS, fournir les
 * visuels dans public/icons/logo/<clé>/ et déclarer les variables CSS
 * correspondantes dans app/globals.css sous :root[data-season="<clé>"].
 * Aucun composant n'est à modifier.
 */

export type SeasonKey = "default" | "october" | "christmas";

/** Jour de l'année au format [mois 1-12, jour 1-31]. */
type MonthDay = [number, number];

export interface SeasonColors {
  /** Violet de la charte. */
  primary: string;
  /** Couleur d'accent (l'orange historique de la charte). */
  accent: string;
  /** Variante assez contrastée pour porter du texte (>= 4.5:1 sur fond clair). */
  accentStrong: string;
  /** Variante claire pour les fonds, badges et survols. */
  accentSoft: string;
  /** Fond général de la page. */
  pageBackground: string;
  /** Fond de section chaud (beige par défaut). */
  sectionWarm: string;
  /** Fond de section froid (lavande par défaut). */
  sectionCool: string;
}

export interface SeasonLogos {
  /** Logo complet avec baseline — en-tête. */
  full: string;
  /** Marque compacte — pied de page (fond sombre). */
  compact: string;
  /** Icône seule — pastille du système de popup. */
  icon: string;
  /** Favicon appliqué dynamiquement hors saison par défaut. */
  favicon: string;
}

export interface SeasonDefinition {
  key: SeasonKey;
  /** Libellé affiché dans la confirmation de bascule. */
  label: string;
  /** Fenêtre d'activation automatique, bornes incluses. null = jamais automatique. */
  window: { start: MonthDay; end: MonthDay } | null;
  colors: SeasonColors;
  logos: SeasonLogos;
}

const DEFAULT_COLORS: SeasonColors = {
  primary: "#642775",
  accent: "#EDA26B",
  accentStrong: "#C4761F",
  accentSoft: "#F7E3D0",
  pageBackground: "#FFFCF7",
  sectionWarm: "#F5EFE0",
  sectionCool: "#FBF6FD",
};

const DEFAULT_LOGOS: SeasonLogos = {
  full: "/icons/logo/LOGO-ENTIER.png",
  compact: "/icons/logo/LOGO-DÉCLINAISON-1.svg",
  icon: "/icons/logo/LOGO_DÉCLINAISON_2.png",
  favicon: "/favicon.ico",
};

export const SEASONS: Record<SeasonKey, SeasonDefinition> = {
  default: {
    key: "default",
    label: "Thème par défaut",
    window: null,
    colors: DEFAULT_COLORS,
    logos: DEFAULT_LOGOS,
  },

  october: {
    key: "october",
    label: "Octobre Rose",
    window: { start: [10, 1], end: [10, 31] },
    colors: {
      // Le violet de la charte est conservé : seul l'orange devient rose.
      primary: "#642775",
      accent: "#FF70C2",
      accentStrong: "#C9327F",
      accentSoft: "#FFD7E3",
      pageBackground: "#FFF8FA",
      sectionWarm: "#FFEFF4",
      sectionCool: "#FFF0F6",
    },
    logos: {
      full: "/icons/logo/october/logo-entier.png",
      compact: "/icons/logo/october/logo-declinaison-1.png",
      icon: "/icons/logo/october/logo-declinaison-2.png",
      favicon: "/icons/logo/october/favicon-october.png",
    },
  },

  // Placeholder : la mécanique est opérationnelle, seuls les visuels et la
  // palette restent à renseigner quand la déclinaison de Noël sera livrée.
  // Penser à ajouter le bloc :root[data-season="christmas"] dans globals.css.
  christmas: {
    key: "christmas",
    label: "Noël",
    window: { start: [12, 1], end: [12, 31] },
    colors: DEFAULT_COLORS,
    logos: DEFAULT_LOGOS,
  },
};

export const SEASON_KEYS = Object.keys(SEASONS) as SeasonKey[];

export const isSeasonKey = (value: unknown): value is SeasonKey =>
  typeof value === "string" && SEASON_KEYS.includes(value as SeasonKey);

export const getSeason = (key: SeasonKey): SeasonDefinition => SEASONS[key];

/** Position d'une date dans l'année, comparable sans tenir compte de l'année. */
const dayOfYearIndex = ([month, day]: MonthDay): number => month * 100 + day;

const isWithinWindow = (date: Date, window: NonNullable<SeasonDefinition["window"]>): boolean => {
  const current = dayOfYearIndex([date.getMonth() + 1, date.getDate()]);
  const start = dayOfYearIndex(window.start);
  const end = dayOfYearIndex(window.end);
  // Une fenêtre à cheval sur le nouvel an (ex. 15/12 -> 06/01) se teste en deux segments.
  return start <= end ? current >= start && current <= end : current >= start || current <= end;
};

/**
 * Saison active pour une date donnée. Fonction pure : le serveur et le client
 * calculent la même valeur, ce qui évite tout écart d'hydratation.
 */
export const resolveSeasonByDate = (date: Date): SeasonKey =>
  SEASON_KEYS.find((key) => {
    const { window } = SEASONS[key];
    return window !== null && isWithinWindow(date, window);
  }) ?? "default";
