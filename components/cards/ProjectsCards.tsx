"use client";
import React from "react";
import { Card, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ImageWrapper from "@/components/wrapper/ImageWrapper";
import { ProjectEntity } from "@/libs/interfaces/entities";
import { returnImageUrlById, truncateText } from "@/libs/stringUtils";

const ProjectCard = ({ props }: { props: ProjectEntity }) => {
  return (
    <Card sx={{ borderRadius: 5 }}>
      <Grid container spacing={1} sx={{ width: "100%" }}>
        <Grid size={{ xs: 12, sm: 12, md: 4, xl: 4 }}>
          <ImageWrapper
            src={returnImageUrlById(props?.cover)}
            alt={props?.title}
            height={353}
          />
        </Grid>
        <Grid
          size={{ xs: 12, sm: 12, md: 8, xl: 8 }}
          sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}
        >
          <Typography variant={"h4"}>{props?.title}</Typography>
          <Typography variant={"body1"} color={"text.secondary"}>
            {truncateText(props?.description, 400)}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProjectCard;
