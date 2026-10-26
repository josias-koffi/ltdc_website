"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FrameSettingContext, ScreenTypeContext } from "@/app/template";
import ACTIVITIES from "./activities.json";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import { motion } from "framer-motion";
import { fadeInLeft, fadeInUp } from "@/components/animation/variants";
import { useAnimationVariants } from "@/hooks/useAnimationVariants";

const MotionBox = motion(Box);

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
  const imageRows = [images.slice(0, 2), images.slice(2, 4)];
  const frame = useContext(FrameSettingContext);
  const notPhoneScreen = useContext(ScreenTypeContext);
  const ABSOLUT_IMAGE_POSITION = notPhoneScreen ? 2 : -300;
  const isMinimal = variant == "minimal";

  const fadeLeft = useAnimationVariants(fadeInLeft);
  const fadeUp = useAnimationVariants(fadeInUp);

  const mapActivities = () => {
    return activities?.map((act: ActivityInterface, index: number) => {
      return (
        <Grid
          key={act.title}
          size={{ xl: isMinimal ? 4 : 6, md: isMinimal ? 4 : 6 }}
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={index}
            transition={{ delay: index * 0.1 } as never}
          >
            <Typography variant={notPhoneScreen ? "h2" : "h3"} sx={{ pb: 3 }}>
              {`0${index + 1}`}
            </Typography>
            <Typography variant={notPhoneScreen ? "h4" : "h5"}>
              {act?.title}
            </Typography>
            <Typography variant="body1">{act?.description}</Typography>
          </motion.div>
        </Grid>
      );
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: isMinimal ? "var(--ltdc-section-warm)" : "var(--ltdc-section-cool)",
        position: "relative",
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: ABSOLUT_IMAGE_POSITION,
          left: ABSOLUT_IMAGE_POSITION,
          zIndex: 0,
          width: 300,
          height: 300,
        }}
      >
        <Image
          src={"/images/homePage/EllipseActivities.svg"}
          alt={"Personnes travaillant ensemble"}
          width={300}
          height={300}
        />
      </motion.div>

      <ContainerWrapper
        sxProps={{
          zIndex: 10,
          color: "var(--ltdc-primary)",
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
              {/* Rangées de deux photos : chacune prend une largeur proportionnelle
                  à son ratio, la rangée a donc une seule hauteur et rien n'est recadré. */}
              {imageRows.map((row, rowIndex) => (
                <Box key={rowIndex} sx={{ display: "flex", gap: 1 }}>
                  {row.map((image, i) => (
                    <motion.div
                      key={image.src}
                      variants={fadeLeft}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      style={{ flex: `${image.width / image.height} 1 0`, minWidth: 0 }}
                      transition={{ delay: (rowIndex * 2 + i) * 0.1 } as never}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          aspectRatio: `${image.width} / ${image.height}`,
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={image.src}
                          alt={`activité ${rowIndex * 2 + i + 1}`}
                          fill
                          sizes="(max-width: 900px) 50vw, 25vw"
                          style={{ objectFit: "cover" }}
                        />
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              ))}
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
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <Typography
                    variant={notPhoneScreen ? "h2" : "h3"}
                    fontWeight={"bold"}
                    sx={{ pb: 3 }}
                  >
                    {"Nos activités "}
                  </Typography>
                </motion.div>
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
