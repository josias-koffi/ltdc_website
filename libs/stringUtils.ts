"use client"
export const updateHtmlAttributes = (
    htmlString: string,
    tagAttributes: { [tagName: string]: { [attrName: string]: string } }
): string => {
    if (typeof window == "undefined") return "<p>Porbleme de parsage</p> "
    // Créer un div temporaire pour manipuler le DOM
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

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
}

// Exemple d'utilisation
const htmlString = `
  <div class="container">
    <p>Hello World</p>
    <a href="#">Lien</a>
  </div>
`;
