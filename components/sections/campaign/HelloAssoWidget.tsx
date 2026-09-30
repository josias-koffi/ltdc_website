"use client";
import React, { useEffect, useRef, useState } from "react";

interface HelloAssoWidgetInterface {
  src: string;
  title: string;
  initialHeight?: number;
  maxWidth?: number;
}

const HELLOASSO_ORIGIN = "https://www.helloasso.com";

// Le widget HelloAsso publie sa hauteur via postMessage : on agrandit l'iframe
// pour eviter une double barre de defilement. La largeur est bornee au contenu
// HelloAsso (~1150px) pour garder des marges roses egales autour du formulaire.
const HelloAssoWidget = ({
  src,
  title,
  initialHeight = 750,
  maxWidth = 1200,
}: HelloAssoWidgetInterface) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(initialHeight);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== HELLOASSO_ORIGIN) return;
      if (event.source !== iframeRef.current?.contentWindow) return;
      const dataHeight = Number(event.data?.height);
      if (Number.isFinite(dataHeight) && dataHeight > 0) {
        setHeight((current) => Math.max(current, dataHeight));
      }
    };
    window.addEventListener("message", onMessage);
    // Le src n'est pose qu'une fois l'ecoute active : sinon l'iframe rendue cote
    // serveur peut envoyer sa hauteur avant l'hydratation et le message est perdu.
    setListening(true);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      title={title}
      src={listening ? src : undefined}
      allow="payment 'self' https://paymenthub.helloassopay.com https://helloasso.com"
      scrolling="auto"
      loading="lazy"
      style={{
        display: "block",
        width: "100%",
        maxWidth,
        height,
        margin: "0 auto",
        border: "none",
      }}
    />
  );
};

export default HelloAssoWidget;
