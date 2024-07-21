"use client";
import React, { useContext } from "react";
import VALUES from "./values.json";
import { FrameSettingContext, ScreenTypeContext } from "@/app/template";
import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";

interface ValueInterface {
  title: string;
  description: string;
  icon: string;
}

const ValuesSection = () => {
  const theme = useTheme();
  const frame = useContext(FrameSettingContext);
  const notPhoneScreen = useContext(ScreenTypeContext);

  const { title, description, values } = VALUES;

  const mapValues = () => {
    return values?.map((value: ValueInterface) => {
      return (
        <Grid
          key={value.title}
          xl={3}
          sm={6}
          xs={6}
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
              height: notPhoneScreen ? 250 : 400,
            }}
            // direction="column"
            // justifyContent="center"
            // alignItems="stretch"
            // spacing={2}
          >
            <Image
              src={value.icon}
              alt={`${value.title}icon`}
              width={80}
              height={80}
            />
            <Typography variant="h6" align="center" fontWeight={"bold"}>
              {value.title}
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
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
      sx={{
        px: frame?.paddingX,
        py: frame?.paddingY,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
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
  );
};

export default ValuesSection;
