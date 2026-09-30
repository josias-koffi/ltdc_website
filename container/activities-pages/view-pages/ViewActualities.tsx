"use client";
import React, { useEffect, useState } from "react";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import ImageWrapper from "@/components/wrapper/ImageWrapper";
import { returnImageUrlById, updateHtmlAttributes } from "@/libs/stringUtils";
import { ActualitiesEntity } from "@/libs/interfaces/entities";
import { Typography, Box } from "@mui/material";
import { formatDate } from "@/libs/dateutils";
import Category from "@/components/entity/Category";
import Targets from "@/components/entity/Targets";

const ViewActualities = ({ actuality }: { actuality: ActualitiesEntity }) => {
  // DOMParser n'existe que dans le navigateur : on rend le HTML brut au serveur
  // puis on ajoute la classe des images après l'hydratation, sans écart de rendu.
  const [content, setContent] = useState(actuality.content);

  useEffect(() => {
    setContent(
      updateHtmlAttributes(actuality.content, { img: { class: "blogImage" } }),
    );
  }, [actuality.content]);

  return (
    <ContainerWrapper>
      {actuality?.cover ? (
        <ImageWrapper
          src={returnImageUrlById(actuality?.cover)}
          alt={"Image de l'actualité"}
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
        <Typography variant={"h2"}>{actuality?.title}</Typography>
        {/*  Description*/}
        <Typography variant={"subtitle1"} sx={{ color: "text.secondary" }}>
          {actuality?.description}
        </Typography>
        {/*  Date box*/}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flew-start",
            gap: 1,
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          <Typography variant={"h6"} sx={{ color: "text.secondary" }}>
            {`Date de publication - ${formatDate(actuality.publication_date)}`}
          </Typography>
          {actuality?.end_validity_date ? (
            <Typography variant={"h6"} sx={{ color: "text.secondary" }}>
              {`Date de fin de validité - ${formatDate(actuality.end_validity_date)}`}
            </Typography>
          ) : null}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Typography variant={"h6"} sx={{ color: "text.secondary" }}>
            {"Theme"}
          </Typography>
          <Category id={actuality?.categories ? actuality?.categories[0] : 1} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Typography variant={"h6"} sx={{ color: "text.secondary" }}>
            {"Public"}
          </Typography>
          <Targets
            id={actuality?.targets ? actuality?.targets[0] : 1}
            entity={"actualities_targets"}
          />
        </Box>
      </Box>
      <Typography
        component="div"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
      {/*  Sources et liens utiles*/}
      {actuality?.sources ? (
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
              __html: actuality.sources,
            }}
          />
        </Box>
      ) : null}

      {/*  Resources*/}
      {actuality?.resources ? (
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

export default ViewActualities;
