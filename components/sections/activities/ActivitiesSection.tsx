"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FrameSettingContext, ScreenTypeContext } from "@/app/template";
import ACTIVITIES from "./activities.json";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";

interface ActivitiesSectionInterface {
  variant?: "minimal" | "detail";
}

interface ActivityInterface {
  title: string;
  description: string;
}

const ActivitiesSection = (props: ActivitiesSectionInterface) => {
  const { variant } = props;
  const { images, activities } = ACTIVITIES;
  const frame = useContext(FrameSettingContext);
  const notPhoneScreen = useContext(ScreenTypeContext);
  const ABSOLUT_IMAGE_POSITION = notPhoneScreen ? 2 : -300;
  const isMinimal = variant == "minimal";

  const mapActivities = () => {
    return activities?.map((act: ActivityInterface, index: number) => {
      return (
        <Grid
          key={act.title}
          size={{ xl: isMinimal ? 4 : 6, md: isMinimal ? 4 : 6 }}
        >
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
        backgroundColor: isMinimal ? "#F5EFE0" : "#FBF6FD",
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
      <ContainerWrapper
        sxProps={{
          zIndex: 10,
          color: "#642775",
        }}
      >
        <Grid container spacing={1} sx={{ alignItems: { xs: "flex-start", md: "center" } }}>
          {!isMinimal ? (
            <Grid
              size={{ xl: 6, md: 6, sm: 12, xs: 12 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  height: 340,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Image
                  src={images[0]}
                  alt="activité 1"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 1, height: 250 }}>
                <Box
                  sx={{
                    position: "relative",
                    flex: 1,
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={images[1]}
                    alt="activité 2"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>
                <Box
                  sx={{
                    position: "relative",
                    flex: 1,
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={images[2]}
                    alt="activité 3"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              </Box>
            </Grid>
          ) : null}

          <Grid
            size={{
              xl: isMinimal ? 12 : 6,
              md: isMinimal ? 12 : 6,
              sm: 12,
              xs: 12,
            }}
            sx={{ zIndex: 10, px: 3 }}
            container
          >
            <Grid container spacing={2}>
              <Grid size={12}>
                <Typography
                  variant={notPhoneScreen ? "h2" : "h3"}
                  fontWeight={"bold"}
                  sx={{ pb: 3 }}
                >
                  {"Nos activités "}
                </Typography>
              </Grid>
              {mapActivities()}
            </Grid>
          </Grid>
        </Grid>
      </ContainerWrapper>
    </Box>
  );
};

export default ActivitiesSection;
