"use client";
import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ScreenTypeContext } from "@/app/template";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import { FetchProps } from "@/libs/interfaces/Interfaces";
import { getItems } from "@/libs/directus";
import { Team } from "@/libs/interfaces/entities";
import ImageWrapper from "@/components/wrapper/ImageWrapper";
import { returnImageUrlById } from "@/libs/stringUtils";
import MembersByTeam from "@/components/sections/members/components/MembersByTeam";

const MemberSection = () => {
  const notPhoneScreen = useContext(ScreenTypeContext);

  return (
    <ContainerWrapper
      sxProps={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        position: "relative",
        py: 10,
      }}
    >
      <Typography
        variant={notPhoneScreen ? "h2" : "h3"}
        fontWeight={"bold"}
        sx={{ pb: 5 }}
      >
        {"Membres"}
      </Typography>
      <MembersByTeam team={Team.DIRECTION} showTips={false} />
      <Button variant={"contained"} href={"/members"} sx={{ p: 3 }}>
        {"Voir tout les membres"}
      </Button>
    </ContainerWrapper>
  );
};

export default MemberSection;
