"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";

interface RubriqueHeadProps {
  imageUrl?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
}

const RubriqueHead = ({
  imageUrl,
  description,
  title,
  imageAlt,
}: RubriqueHeadProps) => {
  return (
    <ContainerWrapper
      sxProps={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 1,
        position: "relative",
        py: 5,
      }}
    >
      <Box sx={{ width: "100%", height: 300, position: "relative", zIndex: 1 }}>
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill={true}
          style={{
            objectFit: "cover",
            borderRadius: 10,
            objectPosition: " right",
          }}
        />
      </Box>
      <Typography variant="h2" align={"left"}>
        {title}
      </Typography>
      <Typography variant="body1" align={"left"}>
        {description}
      </Typography>
    </ContainerWrapper>
  );
};

export default RubriqueHead;
