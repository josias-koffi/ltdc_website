"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import BannerImage from "@/components/wrapper/BannerImage";
import EmissionVideoPlayer from "@/components/sections/video/EmissionVideoPlayer";
import { EmissionEntity } from "@/libs/interfaces/entities";
import { formatDate } from "@/libs/dateutils";
import {
  returnImageUrlById,
  updateHtmlAttributes,
} from "@/libs/stringUtils";

const ViewEmission = ({ emission }: { emission: EmissionEntity }) => {
  const [content, setContent] = useState(emission.content ?? "");

  useEffect(() => {
    setContent(
      updateHtmlAttributes(emission.content ?? "", {
        img: { class: "blogImage" },
      }),
    );
  }, [emission.content]);

  return (
    <ContainerWrapper>
      <BannerImage
        src={returnImageUrlById(emission.cover)}
        alt={`Couverture de l'émission ${emission.title}`}
        file={emission.cover}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          py: 5,
        }}
      >
        <Typography variant="h2">{emission.title}</Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          {emission.description}
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            {`Publié le ${formatDate(emission.publication_date)}`}
          </Typography>
          {emission.episode_number != null ? (
            <Typography variant="h6" color="primary" fontWeight="bold">
              {`Épisode ${emission.episode_number}`}
            </Typography>
          ) : null}
        </Box>
      </Box>

      <EmissionVideoPlayer emission={emission} />

      {content ? (
        <Typography
          component="div"
          sx={{ pt: 5 }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : null}
    </ContainerWrapper>
  );
};

export default ViewEmission;
