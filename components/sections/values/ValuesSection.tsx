"use client";
import React, { useContext } from "react";
import VALUES from "./values.json";
import { ScreenTypeContext } from "@/app/template";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import { motion } from "framer-motion";
import { fadeInUp, scaleIn, staggerContainer } from "@/components/animation/variants";
import { useAnimationVariants } from "@/hooks/useAnimationVariants";

const MotionBox = motion(Box);
const MotionGrid = motion(Grid);

interface ValueInterface {
  title: string;
  description: string;
  icon: string;
}

const ValuesSection = () => {
  const theme = useTheme();
  const notPhoneScreen = useContext(ScreenTypeContext);
  const { title, description, values } = VALUES;

  const fadeUp = useAnimationVariants(fadeInUp);
  const cardVariant = useAnimationVariants(scaleIn);
  const stagger = useAnimationVariants(staggerContainer);

  const mapValues = () => {
    return values?.map((value: ValueInterface) => {
      return (
        <MotionGrid
          key={value.title}
          size={{ xl: 3, md: 3, sm: 6, xs: 12 }}
          variants={cardVariant}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "stretch",
            p: 1,
          }}
        >
          <MotionBox
            whileHover={{ y: -6, boxShadow: "0 16px 32px rgba(100,39,117,0.25)" }}
            transition={{ duration: 0.25 }}
            sx={{
              backgroundColor: theme.palette.primary.main,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              p: 5,
              gap: 2,
              height: "100%",
              cursor: "default",
            }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            >
              <Image
                src={value.icon}
                alt={`${value.title}icon`}
                width={80}
                height={80}
              />
            </motion.div>
            <Typography variant="h6" align="center" fontWeight={"bold"}>
              {value.title}
            </Typography>
            <Typography variant="body1" align="center">
              {value.description}
            </Typography>
          </MotionBox>
        </MotionGrid>
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
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Typography variant={notPhoneScreen ? "h2" : "h3"} fontWeight={"bold"}>
            {title}
          </Typography>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Typography variant="body1">{description}</Typography>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            sx={{ color: "white" }}
          >
            {mapValues()}
          </Grid>
        </motion.div>
      </Stack>
    </ContainerWrapper>
  );
};

export default ValuesSection;
