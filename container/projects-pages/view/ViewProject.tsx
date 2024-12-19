"use client";
import React from "react";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import { ProjectEntity } from "@/libs/interfaces/entities";
import { returnImageUrlById, updateHtmlAttributes } from "@/libs/stringUtils";
import ImageWrapper from "@/components/wrapper/ImageWrapper";
import { Typography, Box } from "@mui/material";
import { formatDate } from "@/libs/dateutils";

const ViewProject = ({ project }: { project: ProjectEntity }) => {
  project.details = updateHtmlAttributes(project.details, {
    img: { class: "blogImage" },
  });

  return (
    <ContainerWrapper>
      {project?.cover ? (
        <ImageWrapper
          src={returnImageUrlById(project?.cover)}
          alt={"Image de couverture du projet"}
        />
      ) : null}

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          gap: 1,
          pt: 5,
        }}
      >
        <Typography variant={"h2"}>{project?.title}</Typography>

        <Typography variant={"subtitle1"} sx={{ color: "text.secondary" }}>
          {project?.description}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 1,
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {project?.start_date ? (
          <Typography variant={"h6"} sx={{ color: "text.secondary" }}>
            {`Date de début : ${formatDate(project.start_date)}`}
          </Typography>
        ) : null}

        {project?.end_date ? (
          <Typography variant={"h6"} sx={{ color: "text.secondary" }}>
            {`Date de fin : ${formatDate(project.end_date)}`}
          </Typography>
        ) : null}

        {project?.status ? (
          <Typography variant={"h6"} sx={{ color: "text.secondary" }}>
            {`Statut : ${project.status}`}
          </Typography>
        ) : null}
      </Box>

      <Typography
        dangerouslySetInnerHTML={{
          __html: project?.details,
        }}
      />
    </ContainerWrapper>
  );
};

export default ViewProject;
