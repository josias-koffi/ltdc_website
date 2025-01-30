"use client";
import React, { useState, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";

const VideoBackground = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // État pour gérer le son
  const [isMuted, setIsMuted] = useState(true);

  // Référence vers la balise <video> (pour éventuellement faire d'autres contrôles)
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleToggleSound = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        overflow: "hidden", // évite un éventuel scroll si la vidéo dépasse
      }}
    >
      {/* La vidéo en arrière-plan */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline // recommandé pour éviter le plein écran sur mobile
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover", // couvre tout l'espace
          zIndex: -1, // place la vidéo derrière le contenu
        }}
      >
        {/* Multiples sources pour une meilleure compatibilité (webm / mp4) */}
        {/*<source src="/videos/hero-section/video_hero_section.mp4" type="video/webm" />*/}
        <source
          src="/videos/hero-section/video_hero_section.mp4"
          type="video/mp4"
        />
        {/* Fallback si le navigateur ne supporte pas la vidéo */}
        Votre navigateur ne supporte pas la lecture de vidéos HTML5.
      </video>
      {/* Bouton pour activer/désactiver le son */}
      <IconButton
        onClick={handleToggleSound}
        sx={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
          zIndex: 1, // pour être au-dessus de la vidéo
          color: "#EDA26B",
        }}
      >
        {isMuted ? (
          <VolumeOffRoundedIcon sx={{ width: 40, height: 40 }} />
        ) : (
          <VolumeUpRoundedIcon sx={{ width: 40, height: 40 }} />
        )}
      </IconButton>

      {/* Contenu au-dessus de la vidéo */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          color: "#fff", // par exemple, texte blanc
          textAlign: "left",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default VideoBackground;
