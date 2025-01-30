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
        // Largeur/hauteur adaptables ou fixes
        width: "100%",
        maxWidth: 800, // par ex. largeur max de 800px
        margin: "0 auto",
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
          width: "100%", // Pour occuper toute la largeur du conteneur
          height: "auto", // Ajuste la hauteur automatiquement
          display: "block",
        }}
      >
        {/* Fallback si le navigateur ne supporte pas la vidéo HTML5 */}
        <p>Votre navigateur ne supporte pas la lecture de vidéos HTML5.</p>
      </video>
    </Box>
  );
}
