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
import MembersByTeam from "@/container/members-pages/MembersByTeam";

const MemberSection = () => {
  const notPhoneScreen = useContext(ScreenTypeContext);

  const [membersInfo, setMembersInfo] = useState([]);

  const fetchMembers = async () => {
    const filter: FetchProps = {
      entity: "members",
      filter: { team: { _eq: Team.ADMINISTRATION } },
      limit: 4,
    };

    try {
      const res = await getItems(filter);
      if (res) {
        setMembersInfo(res);
      }
    } catch (e) {
      throw new Error("Error fetching members");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const mapMembers = () => {
    return membersInfo?.map((member: any) => {
      return (
        <Grid
          key={member.name}
          size={{ xl: 3, md: 4, sm: 6 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "relative",
              height: 400,
              width: 300,
            }}
          >
            <ImageWrapper
              src={returnImageUrlById(member.photo)}
              alt={member.role}
              height={400}
              sx={{
                objectFit: "cover",
                objectPosition: " right",
                zIndex: -1,
              }}
            />
          </Box>

          <Box
            sx={{
              p: 2,
              zIndex: 100,
              backgroundColor: "#FFFFFF",
              height: 40,
              width: 150,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 1,
              borderRadius: 2,
              position: "absolute",
              bottom: -50,
              filter: "drop-shadow(0 0 0.5rem grey)",
            }}
          >
            <Typography variant="h6">{member?.name}</Typography>
            <Typography>{member?.team}</Typography>
          </Box>
        </Grid>
      );
    });
  };

  return (
    <ContainerWrapper
      sxProps={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 0,
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
      <MembersByTeam team={Team.ADMINISTRATION} showTips={false} />
      <Button variant={"contained"} href={"/members"}>
        {"Voir tout les membres"}
      </Button>
    </ContainerWrapper>
  );
};

export default MemberSection;
