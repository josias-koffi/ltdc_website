"use client";
import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import { FilesInterface } from "@/libs/interfaces/entities";

interface ImageWrapperProps {
  src: string;
  width?: number | string;
  height?: number | string;
  zIndex?: number;
  position?: "relative" | "absolute";
  alt: string;
  objectFit?: "cover" | "fill" | "contain";
  objectPosition?: "right" | "left" | "top" | "bottom" | "center";
  sx?: any;
}

const ImageWrapper = (props: ImageWrapperProps) => {
  const {
    src,
    width,
    height,
    position,
    zIndex,
    alt,
    objectFit,
    objectPosition,
  }: ImageWrapperProps = props;
  return (
    <Box
      sx={{
        width: width ?? "100%",
        height: height ?? 300,
        position: position ?? "relative",
        zIndex: zIndex ?? 10,
      }}
    >
      <Image
        src={src ?? ""}
        alt={alt}
        fill={true}
        style={{
          objectFit: objectFit ?? "cover",
          borderRadius: 10,
          objectPosition: objectPosition ?? "center",
        }}
      />
    </Box>
  );
};

export default ImageWrapper;
