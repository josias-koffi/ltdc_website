import { FilesInterface } from "@/libs/interfaces/entities";

export const updateHtmlAttributes = (
  htmlString: string,
  tagAttributes: { [tagName: string]: { [attrName: string]: string } },
): string => {
  if (typeof window == "undefined") return "<p>Porbleme de parsage</p> ";
  // Créer un div temporaire pour manipuler le DOM
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // Parcourir chaque tag spécifié dans l'objet tagAttributes
  for (const tagName in tagAttributes) {
    const elements = doc.getElementsByTagName(tagName);

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];

      // Parcourir chaque attribut à ajouter/modifier
      const attributes = tagAttributes[tagName];
      for (const attrName in attributes) {
        element.setAttribute(attrName, attributes[attrName]);
      }
    }
  }

  // Retourner la nouvelle chaîne HTML
  return doc.body.innerHTML;
};

// Exemple d'utilisation
const htmlString = `
  <div class="container">
    <p>Hello World</p>
    <a href="#">Lien</a>
  </div>
`;

export const returnImageUrlById = (id: string | FilesInterface | undefined) => {
  if (id === undefined || id === null) {
    return process.env.NEXT_PUBLIC_BO_URL + "assets/" + "";
  }
  if (typeof id == "string") {
    return process.env.NEXT_PUBLIC_BO_URL + "assets/" + id;
  }
  return process.env.NEXT_PUBLIC_BO_URL + "assets/" + id.id;
};

/**
 * Champs à demander pour obtenir la couverture avec son point focal (réglé dans
 * l'éditeur d'images Directus) au lieu du seul identifiant de fichier.
 */
export const COVER_WITH_FOCAL_POINT_FIELDS = [
  "*",
  "cover.id",
  "cover.width",
  "cover.height",
  "cover.focal_point_x",
  "cover.focal_point_y",
];

/**
 * Point focal Directus (en pixels) converti en `object-position` CSS, pour que
 * le recadrage garde le sujet choisi. undefined si l'image n'en a pas.
 */
export const focalPointPosition = (
  file: string | FilesInterface | undefined | null,
): string | undefined => {
  if (!file || typeof file === "string") return undefined;
  const { focal_point_x: x, focal_point_y: y, width, height } = file;
  if (x == null || y == null || !width || !height) return undefined;
  const toPercent = (value: number, size: number) =>
    `${Math.min(100, Math.max(0, (value / size) * 100)).toFixed(1)}%`;
  return `${toPercent(x, width)} ${toPercent(y, height)}`;
};

export const cleanAndFormatText = (text: string) => {
  return text.replace(/\n/g, "<br/>"); // Remplace tous les caractères \u200B par des retours à la ligne
};

export const truncateText = (text: string, maxLength?: number) => {
  const MAX_LENGTH = maxLength ?? 50;

  if (text?.length > MAX_LENGTH) {
    return text.slice(0, MAX_LENGTH) + "...";
  }
  return text;
};
