"use client";
import React from "react";
import { PartnerImageInterface } from "@/libs/interfaces/Interfaces";
import ImageWrapper from "@/components/wrapper/ImageWrapper";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const ImageBoxPartner = ({
  image,
}: {
  key?: unknown;
  image: PartnerImageInterface;
}) => {
  const router = useRouter();
  const URL_PARTNER = "/images/partners/";

  const returnSrc = (name: string) => `${URL_PARTNER}${name}`;
  const returnAlt = (name: string) => `Partenaire ${name}`;

  const navigateToPartnerUrl = () => {
    router.push(image.url);
  };

  return (
    <MotionBox
      whileHover={{ scale: 1.08 }}
      transition={{ duration: 0.2 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        filter: "grayscale(30%)",
        "&:hover": {
          filter: "grayscale(0%) brightness(1.05)",
        },
        transition: "filter 0.3s ease",
        "&:focus-visible": {
          outline: "2px solid #EDA26B",
          borderRadius: 1,
        },
      }}
      onClick={navigateToPartnerUrl}
      tabIndex={0}
      role="link"
      aria-label={`Visiter le site de ${image?.name}`}
    >
      <ImageWrapper
        width={200}
        height={200}
        objectFit={"cover"}
        src={returnSrc(image?.sourceName)}
        alt={returnAlt(image?.name)}
      />
      <Typography
        variant={"body1"}
        sx={{ fontWeight: "bold" }}
        color={"primary"}
      >
        {image?.name}
      </Typography>
    </MotionBox>
  );
};

export default ImageBoxPartner;
