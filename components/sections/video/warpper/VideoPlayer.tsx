"use client";

import React from "react";
import { Box } from "@mui/material"; // Optionnel : si tu utilises MUI

/**
 * @param {string} videoUrl - L'URL complète pointant vers la vidéo (hébergée sur Directus ou ailleurs).
 * @param {boolean} controls - Si `true`, affiche les contrôles de lecture.
 * @param {boolean} autoPlay - Si `true`, démarre la lecture automatiquement (souvent combiné avec `muted`).
 * @param {boolean} muted - Permet de couper le son au démarrage.
 * @param {boolean} loop - Redémarre la vidéo après la fin.
 * @param {boolean} playsInline - Évite le plein écran automatique sur mobile.
 */
export default function VideoPlayer({
  videoUrl,
  controls = true,
  autoPlay = false,
  muted = false,
  loop = false,
  playsInline = false,
}: {
  videoUrl: string;
  controls: boolean;
  autoPlay: boolean;
  muted: boolean;
  loop: boolean;
  playsInline: boolean;
}) {
  return (
    <Box
      sx={{
        width: "100%",
        height: 600,
        maxWidth: "100%",
        maxHeight: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <video
        src={videoUrl}
        controls={controls}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        style={{
          width: "100%",
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain", // Empêche la vidéo de dépasser
        }}
      >
        <p>Votre navigateur ne supporte pas la lecture de vidéos HTML5.</p>
      </video>
    </Box>
  );
}
