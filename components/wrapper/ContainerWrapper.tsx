"use client";
import React from "react";
import { Container } from "@mui/material";

interface ContainerWrapperInterface {
  children?: React.ReactNode;
  sxProps?: any;
  containerWidth?: any;
}

const ContainerWrapper = ({
  children,
  sxProps,
  containerWidth,
}: ContainerWrapperInterface) => {
  return (
    <Container
      maxWidth={containerWidth ?? "xl"}
      sx={{ ...{ py: { xl: 10, md: 10, sm: 5, xs: 5 } }, ...sxProps }}
    >
      {children}
    </Container>
  );
};

export default ContainerWrapper;
