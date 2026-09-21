"use client";
import React, { useContext } from "react";
import { ScreenTypeContext } from "@/app/template";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import assoHistory from "./AssoHistory.json";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import ImageWrapper from "@/components/wrapper/ImageWrapper";

const AssoHistorySection = () => {
  const { blocks } = assoHistory;
  const notPhoneScreen = useContext(ScreenTypeContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        backgroundColor: "var(--ltdc-section-warm)",
        py: 5,
      }}
    >
      <ContainerWrapper>
        <Grid container alignItems="start" justifyContent="center" spacing={1}>
          <Grid size={{ xl: 6, md: 6, sm: 12, xs: 12 }}>
            <Typography
              variant={notPhoneScreen ? "h4" : "h3"}
              fontWeight={"bold"}
              sx={{ pb: 5 }}
            >
              {"L’histoire de LTDC – Quand la solidarité devient une mission"}
            </Typography>
            {blocks.map((block, i) =>
              block.type === "list" ? (
                <Box component="ul" key={i} sx={{ pl: 3, my: 1 }}>
                  {block.items!.map((item, j) => (
                    <Typography component="li" key={j} color="text.secondary">
                      {Array.isArray(item)
                        ? item.map((seg, k) =>
                            seg.bold ? <strong key={k}>{seg.text}</strong> : seg.text
                          )
                        : item}
                    </Typography>
                  ))}
                </Box>
              ) : (
                <Typography key={i} color="text.secondary" sx={{ mb: 1 }}>
                  {block.segments
                    ? block.segments.map((seg, j) =>
                        seg.bold ? <strong key={j}>{seg.text}</strong> : seg.text
                      )
                    : block.content}
                </Typography>
              )
            )}
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
          </Grid>
        </Grid>
      </ContainerWrapper>
    </Box>
  );
};

export default AssoHistorySection;
