"use client";
import React, { useState } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import { FilesInterface } from "@/libs/interfaces/entities";

/**
 * Hauteur maximale des bandeaux : en-têtes de rubrique (projets, actualités,
 * événements, offres) et couvertures des pages détail.
 */
export const BANNER_HEIGHT = { xs: 260, sm: 380, md: 480, lg: 560 };

interface BannerImageProps {
  src: string;
  alt: string;
  /** Fichier Directus de l'image : ses dimensions évitent un saut de mise en page. */
  file?: string | FilesInterface | null;
}

/**
 * Bandeau qui montre toute l'image, sans la recadrer (bannières avec des
 * personnes sur les bords, affiches en portrait…) :
 * - image plus large que le bandeau : il prend son ratio, donc moins haut ;
 * - image carrée ou en portrait : hauteur plafonnée à BANNER_HEIGHT, l'image
 *   est centrée et les côtés sont remplis par la même image floutée.
 */
const BannerImage = ({ src, alt, file }: BannerImageProps) => {
  const known =
    file && typeof file !== "string" && file.width && file.height
      ? file.width / file.height
      : undefined;
  // Images du dossier public : le ratio n'est connu qu'au chargement.
  const [loaded, setLoaded] = useState<number>();
  const ratio = known ?? loaded;

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        borderRadius: "10px",
        maxHeight: BANNER_HEIGHT,
        ...(ratio ? { aspectRatio: `${ratio}` } : { height: BANNER_HEIGHT }),
      }}
    >
      <Image
        src={src}
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
          filter: "blur(24px) brightness(0.85)",
          transform: "scale(1.15)",
        }}
      />
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1200px) 100vw, 1200px"
        style={{ objectFit: "contain" }}
        onLoad={(event) => {
          const { naturalWidth, naturalHeight } = event.currentTarget;
          if (naturalWidth && naturalHeight) setLoaded(naturalWidth / naturalHeight);
        }}
      />
    </Box>
  );
};

export default BannerImage;
