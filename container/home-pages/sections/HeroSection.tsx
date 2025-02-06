"use client";
import React, { useContext } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
  Container,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { IconChevronRight } from "@tabler/icons-react";
import Image from "next/image";
import { FrameSettingContext, ScreenTypeContext } from "@/app/template";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import VideoBackground from "@/components/sections/video/VideoBackground";

const HeroSection = () => {
  const theme = useTheme();
  const notPhoneScreen = useContext(ScreenTypeContext);
  const frame = useContext(FrameSettingContext);

  const ABSOLUT_IMAGE_POSITION = notPhoneScreen ? 2 : -300;
  const TITLE_VARIANTS = notPhoneScreen ? "h1" : "h2";

  return (
    <VideoBackground>
      <Container maxWidth={"xl"} sx={{ pb: 20 }}>
        <Grid container direction="row" spacing={0}>
          <Image
            src={"/images/homePage/Ellipse.svg"}
            alt={"Personnes travaillant ensemble"}
            width={500}
            height={500}
            style={{
              position: "absolute",
              top: ABSOLUT_IMAGE_POSITION,
              left: ABSOLUT_IMAGE_POSITION,
            }}
          />
          <Grid
            size={{ xl: 6, md: 6, sm: 12, xs: 12 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              flexWrap: "wrap",
              flexGrow: 1,
              gap: 5,
            }}
          >
            <Typography variant={TITLE_VARIANTS}>
              {"Faire une "}
              <span style={{ color: theme?.palette?.primary?.main }}>
                {"différence"}
              </span>
              {" dans le monde"}
            </Typography>
            <Box>
              {/*<Button*/}
              {/*  variant="contained"*/}
              {/*  sx={{ m: 1 }}*/}
              {/*  size="large"*/}
              {/*  href={"/"}*/}
              {/*  endIcon={<IconChevronRight />}*/}
              {/*>*/}
              {/*  {"Nos activités"}*/}
              {/*</Button>*/}
              <Button
                variant="contained"
                sx={{ m: 1 }}
                size="large"
                href={
                  "https://www.helloasso.com/associations/association-les-travailleurs-du-coeur/collectes/campagne-de-crowdfunding-pour-etablir-un-siege-social"
                }
                endIcon={<IconChevronRight />}
                target="_blank"
              >
                {"Faire un don"}
              </Button>
            </Box>
          </Grid>
          {/*<Grid*/}
          {/*  size={{ xl: 6, md: 6, sm: 12, xs: 12 }}*/}
          {/*  sx={{*/}
          {/*    display: "flex",*/}
          {/*    justifyContent: "center",*/}
          {/*    alignItems: "center",*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <Image*/}
          {/*    src={"/images/homePage/Hero_Images.png"}*/}
          {/*    alt={"Personnes travaillant ensemble"}*/}
          {/*    width={frame?.upperMd ? 600 : frame?.upperSm ? 400 : 0}*/}
          {/*    height={frame?.upperMd ? 600 : frame?.upperSm ? 400 : 0}*/}
          {/*  />*/}
          {/*</Grid>*/}
        </Grid>
      </Container>
    </VideoBackground>
  );
};

export default HeroSection;
