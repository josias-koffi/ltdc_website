export interface Intent {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: "handshake" | "heart" | "mail";
}

export const intents: Intent[] = [
  {
    id: "sponsor",
    label: "Devenir partenaire",
    description:
      "Vous représentez une organisation et souhaitez devenir partenaire.",
    href: "/contact/as-sponsor",
    icon: "handshake",
  },
  {
    id: "volunteer",
    label: "Devenir bénévole",
    description: "Rejoignez nos bénévoles et participez aux maraudes et missions.",
    href: "/contact/as-volunteer",
    icon: "heart",
  },
  {
    id: "general",
    label: "Nous contacter",
    description: "Toute autre demande, suggestion ou information.",
    href: "/contact/general",
    icon: "mail",
  },
];
