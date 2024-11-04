"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import ImageWrapper from "@/components/wrapper/ImageWrapper";

interface RubriqueHeadProps {
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
  width?: number | string;
  height?: number | string;
  objectPosition?: "right" | "left" | "top" | "bottom" | "center";
}

const RubriqueHead = ({
  imageUrl,
  description,
  title,
  imageAlt,
  objectPosition,
  width,
  height,
}: RubriqueHeadProps) => {
  return (
    <ContainerWrapper
      sxProps={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 2,
        position: "relative",
        py: 5,
      }}
    >
      <ImageWrapper
        src={imageUrl}
        alt={imageAlt}
        objectPosition={objectPosition}
        width={width}
        height={height ?? 400}
        sx={{ borderRadius: 5 }}
      />
      <Typography variant="h3" align={"left"}>
        {title}
      </Typography>
      <Typography variant="body1" align={"left"}>
        {description}
      </Typography>
    </ContainerWrapper>
  );
};

export default RubriqueHead;
