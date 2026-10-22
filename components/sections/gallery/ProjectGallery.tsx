"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Box, Dialog, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ImageWrapper from "@/components/wrapper/ImageWrapper";
import { ProjectGalleryEntity } from "@/libs/interfaces/entities";
import { focalPointPosition, returnImageUrlById } from "@/libs/stringUtils";

const lightboxButtonSx = {
  position: "absolute",
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.45)",
  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
};

/** Galerie photo d'un projet : vignettes, puis agrandissement au clic. */
const ProjectGallery = ({
  gallery,
  title,
}: {
  gallery: ProjectGalleryEntity[];
  title: string;
}) => {
  // Les fichiers supprimés du BO laissent une ligne de jonction sans fichier.
  const photos = [...gallery]
    .filter((item) => item?.directus_files_id)
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
    .map((item) => item.directus_files_id);
  const [active, setActive] = useState<number | null>(null);

  const show = useCallback(
    (step: number) =>
      setActive((index) =>
        index === null ? null : (index + step + photos.length) % photos.length,
      ),
    [photos.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") show(-1);
      if (event.key === "ArrowRight") show(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, show]);

  if (!photos.length) return null;

  const alt = (index: number) =>
    photos[index]?.description ||
    photos[index]?.title ||
    `${title} – photo ${index + 1}`;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 3 }}>
      <Typography variant={"h5"} color={"primary"} sx={{ fontWeight: "bold" }}>
        {"Galerie"}
      </Typography>
      <Grid container spacing={2}>
        {photos.map((photo, index) => (
          <Grid key={photo.id} size={{ xs: 6, sm: 4, md: 3 }}>
            <Box
              component="button"
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Agrandir : ${alt(index)}`}
              sx={{
                display: "block",
                width: "100%",
                p: 0,
                border: 0,
                background: "none",
                cursor: "zoom-in",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <ImageWrapper
                src={returnImageUrlById(photo)}
                alt={alt(index)}
                objectPosition={focalPointPosition(photo)}
                zIndex={1}
                sx={{ height: { xs: 160, sm: 200, md: 220 } }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={active !== null}
        onClose={() => setActive(null)}
        maxWidth={"lg"}
        fullWidth
        PaperProps={{ sx: { backgroundColor: "black", position: "relative" } }}
      >
        {active !== null ? (
          <Box sx={{ position: "relative", width: "100%", height: "85vh" }}>
            <Image
              src={returnImageUrlById(photos[active])}
              alt={alt(active)}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              style={{ objectFit: "contain" }}
            />
            <IconButton
              aria-label="Fermer"
              onClick={() => setActive(null)}
              sx={{ ...lightboxButtonSx, top: 8, right: 8 }}
            >
              <CloseRoundedIcon />
            </IconButton>
            {photos.length > 1 ? (
              <>
                <IconButton
                  aria-label="Photo précédente"
                  onClick={() => show(-1)}
                  sx={{ ...lightboxButtonSx, top: "50%", left: 8 }}
                >
                  <ChevronLeftRoundedIcon />
                </IconButton>
                <IconButton
                  aria-label="Photo suivante"
                  onClick={() => show(1)}
                  sx={{ ...lightboxButtonSx, top: "50%", right: 8 }}
                >
                  <ChevronRightRoundedIcon />
                </IconButton>
              </>
            ) : null}
          </Box>
        ) : null}
      </Dialog>
    </Box>
  );
};

export default ProjectGallery;
