"use client";
import React, { useEffect, useState } from "react";
import { MemberEntity } from "@/libs/interfaces/entities";
import { Team } from "@/libs/interfaces/entities";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import { Chip, Button, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FetchProps } from "@/libs/interfaces/Interfaces";
import { getItems } from "@/libs/directus";
import ImageWrapper from "@/components/wrapper/ImageWrapper";
import { returnImageUrlById } from "@/libs/stringUtils";

const MembersByTeam = ({
  team,
  showTips = true,
}: {
  team: Team;
  showTips?: boolean;
}) => {
  const [membersInfo, setMembersInfo] = useState([]);

  const fetchMembers = async () => {
    const filter: FetchProps = {
      entity: "members",
      filter: { team: { _eq: team } },
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
            <Typography color={"text.secondary"}>{member?.team}</Typography>
            <Typography color={"text.secondary"}>{member?.Role}</Typography>
          </Box>
        </Grid>
      );
    });
  };

  return (
    <ContainerWrapper>
      {showTips ? (
        <Chip label={team} color={"primary"} sx={{ borderRadius: 1, mb: 2 }} />
      ) : null}
      <Grid
        container
        spacing={10}
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%" }}
      >
        {mapMembers()}
      </Grid>
    </ContainerWrapper>
  );
};

export default MembersByTeam;
