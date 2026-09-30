"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

interface HelloAssoWidgetInterface {
  src: string;
  title: string;
  initialHeight?: number;
  maxWidth?: number;
  /**
   * Hauteur ajoutée sous celle annoncée par HelloAsso : sa mesure s'arrête au
   * contenu et coupe l'illustration de fond du widget.
   */
  bottomSpace?: number;
  /** Couleur posée derrière l'iframe en mise en page bureau (cf. SeasonCampaign.widgetBackdrop). */
  backdrop?: string;
}

const HELLOASSO_ORIGIN = "https://www.helloasso.com";

/**
 * Le widget passe en mise en page « bureau » (fond teinté, deux colonnes) quand
 * l'iframe atteint ~960px ; en dessous il est sur fond blanc, en une colonne.
 * 960px + les gouttières du Container MUI (2 x 24px) donnent le seuil d'écran.
 */
export const HELLOASSO_DESKTOP_MEDIA = "@media (min-width: 1008px)";

// Le widget HelloAsso publie sa hauteur via postMessage : on agrandit l'iframe
// pour eviter une double barre de defilement. La largeur est bornee au contenu
// HelloAsso (~1150px) pour garder des marges roses egales autour du formulaire.
const HelloAssoWidget = ({
  src,
  title,
  initialHeight = 750,
  maxWidth = 1200,
  bottomSpace = 60,
  backdrop,
}: HelloAssoWidgetInterface) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const [listening, setListening] = useState(false);
  const sized = contentHeight !== null;
  const height = sized ? contentHeight + bottomSpace : initialHeight;
  const heightRef = useRef(height);

  useEffect(() => {
    heightRef.current = height;
  }, [height]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== HELLOASSO_ORIGIN) return;
      if (event.source !== iframeRef.current?.contentWindow) return;
      const dataHeight = Number(event.data?.height);
      if (!Number.isFinite(dataHeight) || dataHeight <= 0) return;
      // Plus courte que l'iframe, la page HelloAsso s'étire à sa taille et la
      // renvoie telle quelle : sans ce filtre, bottomSpace s'ajouterait en boucle.
      if (Math.abs(dataHeight - heightRef.current) < 2) return;
      setContentHeight((current) =>
        Math.max(current ?? 0, Math.ceil(dataHeight)),
      );
    };
    window.addEventListener("message", onMessage);
    // Le src n'est pose qu'une fois l'ecoute active : sinon l'iframe rendue cote
    // serveur peut envoyer sa hauteur avant l'hydratation et le message est perdu.
    setListening(true);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <Box
      sx={{
        maxWidth,
        mx: "auto",
        ...(backdrop
          ? { [HELLOASSO_DESKTOP_MEDIA]: { backgroundColor: backdrop } }
          : {}),
      }}
    >
      <iframe
        ref={iframeRef}
        title={title}
        src={listening ? src : undefined}
        allow="payment 'self' https://paymenthub.helloassopay.com https://helloasso.com"
        // Le document HelloAsso garde une barre de défilement même à sa taille :
        // on la retire une fois la hauteur reçue, pas avant, pour ne rien
        // rendre inaccessible si le message n'arrive jamais.
        scrolling={sized ? "no" : "auto"}
        loading="lazy"
        style={{ display: "block", width: "100%", height, border: "none" }}
      />
    </Box>
  );
};

export default HelloAssoWidget;
