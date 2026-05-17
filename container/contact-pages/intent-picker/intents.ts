export interface Intent {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: "help" | "handshake" | "heart" | "mail";
}

export const intents: Intent[] = [
  {
    id: "beneficiary",
    label: "J'ai besoin d'aide",
    description:
      "Vous traversez une difficulté administrative, professionnelle ou de logement.",
    href: "/contact/as-beneficiary",
    icon: "help",
  },
  {
    id: "sponsor",
    label: "Je veux soutenir l'asso",
    description:
      "Vous représentez une organisation et souhaitez devenir partenaire.",
    href: "/contact/as-sponsor",
    icon: "handshake",
  },
  {
    id: "volunteer",
    label: "Je veux donner du temps",
    description: "Rejoignez nos bénévoles et participez aux maraudes et missions.",
    href: "/contact/as-volunteer",
    icon: "heart",
  },
  {
    id: "general",
    label: "J'ai une question",
    description: "Toute autre demande, suggestion ou information.",
    href: "/contact/general",
    icon: "mail",
  },
];
