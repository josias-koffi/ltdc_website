"use client";
import React, { useContext } from "react";
import VALUES from "./values.json";
import { ScreenTypeContext } from "@/app/template";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";

interface ValueInterface {
  title: string;
  description: string;
  icon: string;
}

const ValuesSection = () => {
  const theme = useTheme();
  const notPhoneScreen = useContext(ScreenTypeContext);

  const { title, description, values } = VALUES;

  const mapValues = () => {
    return values?.map((value: ValueInterface) => {
      return (
        <Grid
          key={value.title}
          size={{ xl: 3, md: 3, sm: 6, xs: 12 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "stretch",
            p: 1,
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              p: 5,
              gap: 2,
              height: 200,
            }}
          >
            <Image
              src={value.icon}
              alt={`${value.title}icon`}
              width={80}
              height={80}
            />
            <Typography variant="h6" align="center" fontWeight={"bold"}>
              {"Nos valeurs"}
            </Typography>
            <Typography variant="body1" align="center">
              {value.description}
            </Typography>
          </Box>
        </Grid>
      );
    });
  };

  return (
    <ContainerWrapper>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          py: 0,
        }}
      >
        <Typography variant={notPhoneScreen ? "h2" : "h3"} fontWeight={"bold"}>
          {title}
        </Typography>
        <Typography variant="body1">{description}</Typography>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ color: "white" }}
        >
          {mapValues()}
        </Grid>
      </Stack>
    </ContainerWrapper>
  );
};

export default ValuesSection;
