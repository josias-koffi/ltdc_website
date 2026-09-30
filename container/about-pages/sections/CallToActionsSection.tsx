"use client";
import React, { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { IconChevronRight } from "@tabler/icons-react";
import { FrameSettingContext, ScreenTypeContext } from "@/app/template";
import Image from "next/image";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import useSeason from "@/hooks/useSeason";

const CallToActionsSection = () => {
  const notPhoneScreen = useContext(ScreenTypeContext);
  const upperMd = useContext(FrameSettingContext);
  const { assets } = useSeason();
  const cta = assets.callToAction;
  const isExternal = /^https?:\/\//.test(cta.url);
  return (
    <ContainerWrapper
      sxProps={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        position: "relative",
        py: 10,
      }}
    >
      {upperMd?.upperMd ? (
        <Box sx={{ position: "absolute" }}>
          <Box
            sx={{
              width: 500,
              height: 400,
              position: "relative",
              right: "-20rem",
              zIndex: 10,
            }}
          >
            <Image
              src={cta.image}
              alt={cta.title}
              fill={true}
              style={{
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>
      ) : null}

      <Grid
        container
        sx={{
          backgroundColor: "var(--ltdc-section-warm)",
          borderRadius: 3,
          p: 5,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Grid size={{ xl: 6 }}>
          <Box sx={{ pb: 10, width: "100%" }}>
            <Typography
              variant={notPhoneScreen ? "h4" : "h5"}
              fontWeight={"bold"}
            >
              {cta.title}
            </Typography>
            <Typography
              variant={"body1"}
              sx={{ color: "text.secondary", whiteSpace: "pre-line" }}
            >
              {cta.text}
            </Typography>
          </Box>
          <Button
            variant={"contained"}
            href={cta.url}
            endIcon={<IconChevronRight />}
            {...(isExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {cta.buttonLabel}
          </Button>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
};

export default CallToActionsSection;
