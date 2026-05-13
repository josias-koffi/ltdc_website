"use client";
import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { IconChevronRight, IconChevronDown } from "@tabler/icons-react";
import Image from "next/image";
import { ScreenTypeContext } from "@/app/template";
import VideoBackground from "@/components/sections/video/VideoBackground";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const HeroSection = () => {
  const theme = useTheme();
  const notPhoneScreen = useContext(ScreenTypeContext);
  const [hasScrolled, setHasScrolled] = useState(false);

  const ABSOLUT_IMAGE_POSITION = notPhoneScreen ? 2 : -300;
  const TITLE_VARIANTS = notPhoneScreen ? "h1" : "h2";

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 20) setHasScrolled(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            <MotionTypography
              variant={TITLE_VARIANTS}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            >
              {"Faire une "}
              <motion.span
                style={{ color: theme?.palette?.primary?.main }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.75 }}
              >
                {"différence"}
              </motion.span>
              {" dans le monde"}
            </MotionTypography>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.75 }}
            >
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{ display: "inline-block" }}
              >
                <Button
                  variant="contained"
                  sx={{ m: 1 }}
                  size="large"
                  href="https://www.helloasso.com/associations/association-les-travailleurs-du-c-ur/formulaires/1"
                  endIcon={<IconChevronRight />}
                  target="_blank"
                >
                  {"Faire un don"}
                </Button>
              </motion.div>
            </MotionBox>
          </Grid>
        </Grid>
      </Container>

      {/* Animated scroll indicator */}
      <AnimatePresence>
        {!hasScrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "absolute",
              bottom: "5rem",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 2,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <IconChevronDown size={32} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </VideoBackground>
  );
};

export default HeroSection;
