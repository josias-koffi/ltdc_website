import React, { useContext } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import footerData from "./footer.json";
import Link from "next/link";
import SocialLinks from "@/components/footer/SocialLinks";
import { FrameSettingContext } from "@/app/template";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import ImageWrapper from "@/components/wrapper/ImageWrapper";

const Footer = () => {
  const frame = useContext(FrameSettingContext);
  const mapQuickLinks = () => {
    return footerData?.quickLinks?.map((quickLink: any, index: number) => {
      return (
        <Grid key={quickLink.link + index} size={{ xl: 6 }}>
          <Link
            style={{
              color: "white",
              textDecoration: "none",
              textWrap: "nowrap",
            }}
            href={quickLink.link}
          >
            {quickLink?.name}
          </Link>
        </Grid>
      );
    });
  };
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: "#2A2A2A",
        color: "white",
        py: 5,
        pt: {
          sm: 0,
          md: 0,
        },
      }}
    >
      <ContainerWrapper>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            <Grid size={{ xl: 6, xs: 12 }}>
              <ImageWrapper
                src={"/icons/logo/LOGO-DÉCLINAISON-1.svg"}
                alt={"icon asso"}
                width={90}
                height={80}
                objectFit={"cover"}
              />
              <Typography variant="h5" component="div">
                {footerData?.callSentence}
              </Typography>
              <Typography variant="body1" component="div" sx={{ pt: 2 }}>
                {footerData?.richDescription}
              </Typography>
            </Grid>
            <Grid
              size={{ xl: 6, xs: 12 }}
              sx={{
                pt: { xl: "5rem", sm: 0 },
                display: "flex",
                flexDirection: "column",
                alignItems: { xl: "flex-end", sm: "flex-start" },
              }}
            >
              <Typography variant="h5" component="div">
                {"Liens rapides"}
              </Typography>
              <Grid container spacing={2} sx={{ pt: 2 }}>
                {mapQuickLinks()}
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            pt: 5,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <SocialLinks />
          <Typography variant="body2" component="div">
            {`© Tout droits réservés ${new Date().getFullYear()}`}
            <span style={{ color: theme?.palette?.secondary?.main }}>
              {" LTDC"}
            </span>
          </Typography>
        </Box>
      </ContainerWrapper>
    </Box>
  );
};

export default Footer;
