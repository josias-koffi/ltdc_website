"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import ImageWrapper from "@/components/wrapper/ImageWrapper";
import { cleanAndFormatText } from "@/libs/stringUtils";
import { motion } from "framer-motion";

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
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ width: "100%", overflow: "hidden", borderRadius: 12 }}
      >
        <ImageWrapper
          src={imageUrl}
          alt={imageAlt}
          objectPosition={objectPosition}
          width={width}
          height={height ?? 400}
          sx={{ borderRadius: 5 }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
      >
        <Typography variant="h3" align={"left"}>
          {title}
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Typography
          component="div"
          dangerouslySetInnerHTML={{ __html: cleanAndFormatText(description) }}
          color={"text.secondary"}
        />
      </motion.div>
    </ContainerWrapper>
  );
};

export default RubriqueHead;
