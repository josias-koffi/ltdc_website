"use client";
import React from "react";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import ImageWrapper from "@/components/wrapper/ImageWrapper";
import { returnImageUrlById } from "@/libs/stringUtils";
import { Actualities } from "@/libs/interfaces/entities";
import { Typography, Box } from "@mui/material";

const ViewActualities = ({ actuality }: { actuality?: Actualities }) => {
  console.log(actuality);
  return (
    <ContainerWrapper>
      <ImageWrapper
        src={returnImageUrlById(actuality?.cover?.id)}
        alt={actuality?.cover?.title}
      />
      <Box
        sx={{ disable: "flex", justifyContent: "flex-start", gap: 5, pt: 5 }}
      >
        <Typography variant={"h3"}>{actuality?.title}</Typography>
        <Typography variant={"subtitle1"} sx={{ color: "text.secondary" }}>
          {actuality?.description}
        </Typography>
        <div dangerouslySetInnerHTML={{ __html: actuality?.content }} />
      </Box>
    </ContainerWrapper>
  );
};

export default ViewActualities;
