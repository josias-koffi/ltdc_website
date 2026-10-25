"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Box, Dialog, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ImageWrapper from "@/components/wrapper/ImageWrapper";
import { GalleryEntity } from "@/libs/interfaces/entities";
import { focalPointPosition, returnImageUrlById } from "@/libs/stringUtils";

const lightboxButtonSx = {
  position: "absolute",
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.45)",
  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
};

const watermarkSx = {
  position: "absolute",
  right: { xs: 8, sm: 12 },
  bottom: { xs: 6, sm: 10 },
  zIndex: 2,
  color: "rgba(255, 255, 255, 0.72)",
  fontSize: { xs: "0.68rem", sm: "0.82rem" },
  fontWeight: 700,
  letterSpacing: "0.02em",
  lineHeight: 1,
  textShadow: "0 1px 3px rgba(0, 0, 0, 0.95)",
  pointerEvents: "none",
  userSelect: "none",
};

const Watermark = ({ large = false }: { large?: boolean }) => (
  <Typography
    component="span"
    aria-hidden="true"
    sx={
      large
        ? {
            ...watermarkSx,
            right: { xs: 14, sm: 24 },
            bottom: { xs: 12, sm: 20 },
            fontSize: { xs: "0.8rem", sm: "1rem" },
          }
        : watermarkSx
    }
  >
    @association_ltdc
  </Typography>
);

/** Galerie photo partagée par les projets et les actualités. */
const ProjectGallery = ({
  gallery,
  title,
}: {
  gallery: GalleryEntity[];
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

  const activePhoto = active !== null ? photos[active] : null;
  const activeRatio =
    activePhoto?.width && activePhoto.height
      ? activePhoto.width / activePhoto.height
      : null;

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
                position: "relative",
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
              <Watermark />
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
        {active !== null && activePhoto ? (
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "85vh",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: activeRatio
                  ? `min(100%, calc(85vh * ${activeRatio}))`
                  : "100%",
                ...(activeRatio
                  ? { aspectRatio: `${activeRatio}` }
                  : { height: "85vh" }),
                maxHeight: "85vh",
              }}
            >
              <Image
                src={returnImageUrlById(activePhoto)}
                alt={alt(active)}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                style={{ objectFit: "contain" }}
              />
              <Watermark large />
            </Box>
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
