"use client";
import React, { useEffect, useState } from "react";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import ImageWrapper, {
  DETAIL_BANNER_HEIGHT,
} from "@/components/wrapper/ImageWrapper";
import {
  focalPointPosition,
  returnImageUrlById,
  updateHtmlAttributes,
} from "@/libs/stringUtils";
import { ProjectEntity } from "@/libs/interfaces/entities";
import { Typography, Box } from "@mui/material";
import { formatDate } from "@/libs/dateutils";
import Targets from "@/components/entity/Targets";

const ViewProject = ({ project }: { project: ProjectEntity }) => {
  // DOMParser n'existe que dans le navigateur : on rend le HTML brut au serveur
  // puis on ajoute la classe des images après l'hydratation, sans écart de rendu.
  const [details, setDetails] = useState(project.details);

  useEffect(() => {
    setDetails(
      updateHtmlAttributes(project.details, { img: { class: "blogImage" } }),
    );
  }, [project.details]);

  return (
    <ContainerWrapper>
      {project?.cover ? (
        <ImageWrapper
          src={returnImageUrlById(project?.cover)}
          alt={"Image du projet"}
          objectPosition={focalPointPosition(project.cover)}
          sx={{ height: DETAIL_BANNER_HEIGHT }}
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
        {/*Title*/}
        <Typography variant={"h2"}>{project?.title}</Typography>
        {/*  Description*/}
        <Typography variant={"subtitle1"} sx={{ color: "text.secondary" }}>
          {project?.description}
        </Typography>
        {/*  Date box*/}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: 1,
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          {project?.start_date ? (
            <Typography variant={"h6"} sx={{ color: "text.secondary" }}>
              {`Date de début - ${formatDate(project.start_date)}`}
            </Typography>
          ) : null}
          {project?.end_date ? (
            <Typography variant={"h6"} sx={{ color: "text.secondary" }}>
              {`Date de fin - ${formatDate(project.end_date)}`}
            </Typography>
          ) : null}
        </Box>
        {/*  Coût : les projets n'ont pas de thème, il prend sa place*/}
        {project?.cout ? (
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography variant={"h6"} sx={{ color: "text.secondary" }}>
              {"Coût"}
            </Typography>
            <Typography
              variant={"h6"}
              color={"primary"}
              sx={{ fontWeight: "bold" }}
            >
              {`${project.cout.toLocaleString("fr-FR")} €`}
            </Typography>
          </Box>
        ) : null}
        {project?.targets?.length ? (
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Typography variant={"h6"} sx={{ color: "text.secondary" }}>
              {"Public"}
            </Typography>
            <Targets id={project.targets[0]} entity={"projects_targets"} />
          </Box>
        ) : null}
      </Box>
      <Typography
        component="div"
        dangerouslySetInnerHTML={{
          __html: details,
        }}
      />
      {/*  Sources et liens utiles*/}
      {project?.sources ? (
        <Box>
          <Typography
            variant={"h5"}
            color={"primary"}
            sx={{ fontWeight: "bold" }}
          >
            {"Sources et liens utiles"}
          </Typography>
          <Typography
            component="div"
            dangerouslySetInnerHTML={{
              __html: project.sources,
            }}
          />
        </Box>
      ) : null}

      {/*  Resources*/}
      {project?.resources ? (
        <Box>
          <Typography
            variant={"h5"}
            color={"primary"}
            sx={{ fontWeight: "bold" }}
          >
            {"Resources"}
          </Typography>
        </Box>
      ) : null}
    </ContainerWrapper>
  );
};

export default ViewProject;
