"use client";

import React, { useEffect, useState } from "react";
import { MemberEntity, Team } from "@/libs/interfaces/entities";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import { Chip, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { FetchProps } from "@/libs/interfaces/Interfaces";
import { getItems } from "@/libs/directus";
import ImageWrapper from "@/components/wrapper/ImageWrapper";
import { returnImageUrlById } from "@/libs/stringUtils";
import MappingRoles from "@/components/sections/members/components/MappingRoles";

const MembersByTeam = ({
  team,
  showTips = true,
}: {
  team: Team;
  showTips?: boolean;
}) => {
  const [membersInfo, setMembersInfo] = useState<MemberEntity[]>([]);

  const fetchMembers = async () => {
    const filter: FetchProps = {
      entity: "members",
      filter: { team: { _eq: team } },
      limit: 4,
      sort: ["order"],
    };

    try {
      const res = await getItems(filter);
      if (res) {
        setMembersInfo(res);
      }
    } catch (e) {
      console.error("Error fetching members:", e);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [team]);

  return (
    <ContainerWrapper
      sxProps={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        justifyItems: "center",
        alignContent: "center",
      }}
    >
      {showTips && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <Chip
            label={team}
            color="primary"
            sx={{ borderRadius: 2, mb: 2, fontSize: 18, px: 4 }}
          />
        </Box>
      )}
      <Grid
        container
        spacing={4}
        sx={{
          width: "100%",
          justifyContent: { md: "center", xl: "flex-start" },
        }}
      >
        {membersInfo.map((member: MemberEntity) => (
          <Grid item key={member.id} xs={12} sm={6} md={4} lg={3}>
            <Box sx={{ position: "relative", mb: 8 }}>
              <Box
                sx={{
                  position: "relative",
                  height: 400,
                  width: "100%",
                  maxWidth: 300,
                  margin: "0 auto",
                }}
              >
                <ImageWrapper
                  src={returnImageUrlById(member.photo)}
                  alt={`${member?.name} ${member.team}`}
                  objectFit="cover"
                  objectPosition="center"
                  height={400}
                />
              </Box>
              <Box
                sx={{
                  zIndex: 100,
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 1,
                  borderRadius: 2,
                  position: "absolute",
                  bottom: -60,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "90%",
                  maxWidth: 270,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ textAlign: "center", width: "100%" }}
                >
                  {member?.name}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ textAlign: "center", width: "100%" }}
                >
                  <MappingRoles roles={member?.roles} />
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </ContainerWrapper>
  );
};

export default MembersByTeam;
