import React from "react";
import { Alert, Box } from "@mui/material";
import { EmissionEntity } from "@/libs/interfaces/entities";
import { returnImageUrlById } from "@/libs/stringUtils";
import { getYoutubeEmbedUrl } from "@/libs/videoUtils";

const EmissionVideoPlayer = ({ emission }: { emission: EmissionEntity }) => {
  const youtubeEmbedUrl =
    emission.video_source === "youtube"
      ? getYoutubeEmbedUrl(emission.youtube_url)
      : null;

  if (emission.video_source === "youtube" && youtubeEmbedUrl) {
    return (
      <Box
        component="iframe"
        src={youtubeEmbedUrl}
        title={`Vidéo de l'émission ${emission.title}`}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        sx={{
          width: "100%",
          aspectRatio: "16 / 9",
          border: 0,
          borderRadius: 3,
        }}
      />
    );
  }

  if (emission.video_source === "directus" && emission.video_file) {
    return (
      <Box
        component="video"
        src={returnImageUrlById(emission.video_file)}
        poster={returnImageUrlById(emission.cover)}
        controls
        playsInline
        preload="metadata"
        sx={{
          display: "block",
          width: "100%",
          maxHeight: { xs: 360, md: 680 },
          borderRadius: 3,
          bgcolor: "#000",
        }}
      >
        Votre navigateur ne supporte pas la lecture de vidéos HTML5.
      </Box>
    );
  }

  return <Alert severity="warning">Vidéo indisponible.</Alert>;
};

export default EmissionVideoPlayer;
