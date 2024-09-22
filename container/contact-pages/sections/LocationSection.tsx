"use client";
import React from "react";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const LocationSection = () => {
  return (
    <ContainerWrapper>
      <Grid container spacing={2}>
        <Grid size={{ xl: 4, md: 6, sm: 12, xs: 12 }}>
          <Typography variant={"h3"}>{"Nous trouver"}</Typography>
          <Box>
            <Typography variant={"h5"}>{"Paris"}</Typography>
            <Typography variant={"h5"}>
              {"508 Bridle Avenue Newnan,"}
            </Typography>
            <Typography variant={"h5"}>{"50823"}</Typography>
          </Box>
        </Grid>
        <Grid size={{ xl: 8, md: 6, sm: 12, xs: 12 }}>
          <iframe
            width="100%"
            height="500"
            id="gmap_canvas"
            src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
            frameBorder={0}
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
          ></iframe>
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
};

export default LocationSection;
