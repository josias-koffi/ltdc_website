"use client";
import React, { useContext } from "react";
import { ScreenTypeContext } from "@/app/template";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import assoHistory from "./AssoHistory.json";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import { cleanAndFormatText } from "@/libs/stringUtils";
import ImageWrapper from "@/components/wrapper/ImageWrapper";

const AssoHistorySection = () => {
  const { text } = assoHistory;
  const notPhoneScreen = useContext(ScreenTypeContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        backgroundColor: "#F5EFE0",
        py: 5,
      }}
    >
      <ContainerWrapper>
        <Grid container alignItems="center" justifyContent="center" spacing={1}>
          <Grid size={{ xl: 6, md: 6, sm: 12, xs: 12 }}>
            <Typography
              variant={notPhoneScreen ? "h2" : "h3"}
              fontWeight={"bold"}
              sx={{ pb: 5 }}
            >
              {"L’histoire de la création de LTDC"}
            </Typography>
            <Typography
              component="div"
              dangerouslySetInnerHTML={{ __html: text }}
              color={"text.secondary"}
            />
          </Grid>
          <Grid
            size={{ xl: 6, md: 6, sm: 12, xs: 12 }}
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ImageWrapper
              height={650}
              objectFit={"contain"}
              src={"/images/aboutPage/historySection.png"}
              alt={"Image a propos de l'association"}
            />

            {/*<Box sx={{ height: 600, width: 350, position: "relative" }}>*/}
            {/*  <Image*/}
            {/*    src={"/images/aboutPage/historySection.png"}*/}
            {/*    alt="Asso image of peoples"*/}
            {/*    fill={true}*/}
            {/*    style={{*/}
            {/*      objectFit: "cover",*/}
            {/*      objectPosition: " right",*/}
            {/*      zIndex: 5,*/}
            {/*    }}*/}
            {/*  />*/}
            {/*</Box>*/}
          </Grid>
        </Grid>
      </ContainerWrapper>
    </Box>
  );
};

export default AssoHistorySection;
