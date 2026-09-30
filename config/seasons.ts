/**
 * Habillages saisonniers du site (logos + palette + visuels).
 *
 * Source de vérité unique, sans dépendance React : ce module est importable
 * aussi bien côté serveur (rendu initial) que côté client (bascule à chaud).
 *
 * Pour ajouter une opération : déclarer une entrée dans SEASONS, fournir les
 * visuels dans public/icons/logo/<clé>/ et déclarer les variables CSS
 * correspondantes dans app/globals.css sous :root[data-season="<clé>"].
 * Les contenus saisonniers (vidéo du hero, bloc d'appel à l'action, campagne
 * HelloAsso) se déclarent dans `assets` : seuls les champs qui changent sont à
 * renseigner, les autres retombent sur DEFAULT_ASSETS. Les fichiers vont dans
 * public/images/<clé>/ (ou public/videos/<clé>/ pour les vidéos).
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

export interface SeasonCampaign {
  /** Titre de la section campagne de l'accueil. */
  title: string;
  description?: string;
  /** URL du widget HelloAsso (se termine par /widget). */
  widgetUrl: string;
  /**
   * Fond de la section sur grand écran, à caler sur celui du formulaire
   * HelloAsso pour que l'iframe se fonde dans la page. Absent = fond de page.
   */
  background?: string;
  /** Fond sur mobile, où le widget HelloAsso est blanc. Défaut : blanc. */
  mobileBackground?: string;
  /**
   * Couleur posée juste derrière l'iframe. Le fond du widget bureau est un voile
   * qui se multiplie à ce qu'il y a derrière (teinte mesurée ≈ #FDEAF2 pour
   * Octobre Rose) : pour qu'il rende exactement `background`, il faut ici
   * `background` ÷ teinte, canal par canal. Absent = `background`.
   */
  widgetBackdrop?: string;
}

/** Bloc d'appel à l'action des pages À propos et Membres (« Rejoignez-nous » par défaut). */
export interface SeasonCallToAction {
  title: string;
  /** Les retours à la ligne sont conservés à l'affichage. */
  text: string;
  buttonLabel: string;
  /** Lien interne (/offers) ou externe (https://…, ouvert dans un nouvel onglet). */
  url: string;
  /** Visuel affiché à côté du bloc sur grand écran. */
  image: string;
}

export interface SeasonAssets {
  /** Vidéo de fond du hero de l'accueil. */
  heroVideo: string;
  /** Image affichée tant que la vidéo du hero n'est pas chargée. */
  heroPoster: string;
  callToAction: SeasonCallToAction;
  /** Campagne HelloAsso de l'accueil. null = section masquée. */
  campaign: SeasonCampaign | null;
}

export interface SeasonDefinition {
  key: SeasonKey;
  /** Libellé affiché dans la confirmation de bascule. */
  label: string;
  /** Fenêtre d'activation automatique, bornes incluses. null = jamais automatique. */
  window: { start: MonthDay; end: MonthDay } | null;
  colors: SeasonColors;
  logos: SeasonLogos;
  /** Contenus propres à la saison ; tout champ absent reprend DEFAULT_ASSETS. */
  assets?: SeasonAssetOverrides;
}

/** Surcharges d'une saison : l'appel à l'action se surcharge aussi champ par champ. */
export type SeasonAssetOverrides = Partial<Omit<SeasonAssets, "callToAction">> & {
  callToAction?: Partial<SeasonCallToAction>;
};

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

const DEFAULT_ASSETS: SeasonAssets = {
  heroVideo: "/videos/hero-section/video_hero_section.mp4",
  heroPoster: "/images/homePage/Ellipse.svg",
  callToAction: {
    title: "Rejoignez-nous",
    text:
      "Rejoignez-nous pour faire un travail significatif avec des collègues bienveillants " +
      "et intelligents, investis dans votre développement.",
    buttonLabel: "Nous rejoindre",
    url: "/offers",
    image: "/images/recrutement_image.png",
  },
  campaign: null,
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
      accent: "#DC2A8F",
      accentStrong: "#A8165F",
      accentSoft: "#FFB8D6",
      pageBackground: "#FFF0F6",
      sectionWarm: "#FFDCEA",
      sectionCool: "#FFDCEA",
    },
    logos: {
      full: "/icons/logo/october/logo-entier.png",
      compact: "/icons/logo/october/logo-declinaison-1.png",
      icon: "/icons/logo/october/logo-declinaison-2.png",
      favicon: "/icons/logo/october/favicon-october.png",
    },
    assets: {
      // heroVideo : vidéo Octobre Rose pas encore livrée, la vidéo par défaut
      // reste affichée d'ici là.
      callToAction: {
        title: "C’est bientôt disponible !",
        text:
          "🎙️ Découvrez Un bout de ma vie, notre toute nouvelle émission.\n\n" +
          "Pour ce premier épisode, Sarah, Lila et Mélanie se livrent sur leur parcours face au " +
          "cancer du sein. Un échange authentique, rempli de courage et d’émotion.\n" +
          "📅 Rendez-vous le 09 octobre. 💗",
        buttonLabel: "Voir sur YouTube",
        url: "https://www.youtube.com/channel/UCsuewndAyw8jXs1agFpBKCg",
        image: "/images/october/vu-bout-de-ma-vie.jpg",
      },
      campaign: {
        title: "Mission Octobre Rose",
        description:
          "Un mois pour agir, un don pour avancer. Dans le cadre de la Mission Rose LTDC, " +
          "une partie des dons sera reversée à notre association partenaire, Tout le Monde Contre le Cancer.",
        widgetUrl:
          "https://www.helloasso.com/associations/association-les-travailleurs-du-c-ur/formulaires/2/widget",
        background: "#FEDDE8",
        // #FEDDE8 ÷ teinte du widget : l'iframe rend alors le même rose que la section.
        widgetBackdrop: "#FFF1F5",
      },
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

/** Visuels effectifs d'une saison : ceux qu'elle déclare, sinon ceux par défaut. */
export const getSeasonAssets = (key: SeasonKey): SeasonAssets => {
  const { callToAction, ...overrides } = SEASONS[key].assets ?? {};
  return {
    ...DEFAULT_ASSETS,
    ...overrides,
    callToAction: { ...DEFAULT_ASSETS.callToAction, ...callToAction },
  };
};

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
