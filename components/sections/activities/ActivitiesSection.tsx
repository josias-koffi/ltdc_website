"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { FrameSettingContext, ScreenTypeContext } from "@/app/template";
import ACTIVITIES from "./activities.json";

interface ActivitiesSectionInterface {
  variant?: "minimal" | "detail";
}
interface ActivityInterface {
  title: string;
  description: string;
}

const ActivitiesSection = (props: ActivitiesSectionInterface) => {
  const { variant } = props;
  const { title, images, activities } = ACTIVITIES;
  const frame = useContext(FrameSettingContext);
  const notPhoneScreen = useContext(ScreenTypeContext);
  const ABSOLUT_IMAGE_POSITION = notPhoneScreen ? 2 : -300;

  const mapImages = () => {
    return images?.map((image: string, index: number) => {
      return (
        <Grid item xl={index === 0 ? 12 : 5}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              backgroundImage: `url(${image})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }}
            height={340}
          />
        </Grid>
      );
    });
  };

  const mapActivities = () => {
    return activities?.map((act: ActivityInterface, index: number) => {
      return (
        <Grid item xl={6}>
          <Typography variant={notPhoneScreen ? "h2" : "h3"} sx={{ pb: 3 }}>
            {`0${index + 1}`}
          </Typography>
          <Typography variant={notPhoneScreen ? "h4" : "h5"}>
            {act?.title}
          </Typography>
          <Typography variant="body1">{act?.description}</Typography>
        </Grid>
      );
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        backgroundColor: variant == "minimal" ? null : "#FBF6FD",
        position: "relative",
      }}
    >
      <Image
        src={"/images/homePage/EllipseActivities.svg"}
        alt={"Personnes travaillant ensemble"}
        width={300}
        height={300}
        style={{
          position: "absolute",
          top: ABSOLUT_IMAGE_POSITION,
          left: ABSOLUT_IMAGE_POSITION,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          px: frame?.paddingX,
          py: frame?.paddingY,
          zIndex: 2,
          color: "#642775",
        }}
      >
        <Grid container spacing={1}>
          <Grid xl={6} md={6} sm={12} xs={12}>
            <Grid
              container
              spacing={1}
              direction="row"
              justifyContent="flex-start"
              alignItems="flex-end"
            >
              {mapImages()}
            </Grid>
          </Grid>
          <Grid xl={6} md={6} sm={12} xs={12}>
            <Grid container spacing={2}>
              <Grid xl={12}>
                <Typography
                  variant={notPhoneScreen ? "h2" : "h3"}
                  sx={{ pb: 3 }}
                >
                  {title}
                </Typography>
              </Grid>
              {mapActivities()}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ActivitiesSection;
