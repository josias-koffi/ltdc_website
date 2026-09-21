"use client";
import React, { useState, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import { motion } from "framer-motion";

const MotionIconButton = motion(IconButton);

const VideoBackground = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleToggleSound = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        poster="/images/homePage/Ellipse.svg"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source
          src="/videos/hero-section/video_hero_section.mp4"
          type="video/mp4"
        />
        Votre navigateur ne supporte pas la lecture de vidéos HTML5.
      </video>

      {/* Gradient overlay — improves text legibility on any video frame */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 40%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <MotionIconButton
        onClick={handleToggleSound}
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        sx={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
          zIndex: 2,
          color: "var(--ltdc-accent)",
        }}
      >
        {isMuted ? (
          <VolumeOffRoundedIcon sx={{ width: 40, height: 40 }} />
        ) : (
          <VolumeUpRoundedIcon sx={{ width: 40, height: 40 }} />
        )}
      </MotionIconButton>

      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          height: "100%",
          color: "#fff",
          textAlign: "left",
          zIndex: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default VideoBackground;
