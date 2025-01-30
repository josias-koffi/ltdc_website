"use client";

import React, { useEffect, useState } from "react";
import { MemberEntity, Team } from "@/libs/interfaces/entities";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import { Chip, Box, Typography, Dialog } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FetchProps } from "@/libs/interfaces/Interfaces";
import { getItems } from "@/libs/directus";
import ImageWrapper from "@/components/wrapper/ImageWrapper";
import { returnImageUrlById } from "@/libs/stringUtils";
import MappingRoles from "@/components/sections/members/components/MappingRoles";
import CustomDialog from "@/components/dialog/CustomDialog";
import VideoPlayer from "@/components/sections/video/warpper/VideoPlayer";

const MembersByTeam = ({
  team,
  showTips = true,
  isInteractive = false,
}: {
  team: Team;
  showTips?: boolean;
  isInteractive?: boolean;
}) => {
  const [membersInfo, setMembersInfo] = useState<MemberEntity[]>([]);
  const [activeMember, setActiveMember] = useState<MemberEntity>();

  const [open, setOpen] = React.useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

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
  const getVideoUrl = (itvUrl: MemberEntity["itv"]): string => {
    return `${process.env.NEXT_PUBLIC_BO_URL}assets/${itvUrl}`;
  };

  useEffect(() => {
    fetchMembers();
  }, [team]);

  const handleClickActiveMember = (member: MemberEntity) => {
    if (member?.itv) {
      setActiveMember(member);
      setOpen(true);
    }
  };

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
        <CustomDialog
          title={`ITV de ${activeMember?.name}`}
          open={open}
          handleClose={handleClose}
        >
          <VideoPlayer
            videoUrl={getVideoUrl(activeMember?.itv)}
            controls
            autoPlay={false}
            muted={false}
            loop={false}
            playsInline
          />
        </CustomDialog>
        {membersInfo.map((member: MemberEntity) => (
          <Grid key={member.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Box
              onClick={() => {
                handleClickActiveMember(member);
              }}
              sx={{
                position: "relative",
                mb: 8,
                // Si l'élément est interactif, on change le curseur
                cursor: isInteractive ? "pointer" : "default",
                // Transition pour animer le changement de boxShadow/bordure
                transition: "box-shadow 0.3s ease, border 0.3s ease",
              }}
            >
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
                  sx={{
                    // Au survol (hover), on applique le glow UNIQUEMENT si isInteractive === true
                    ...(isInteractive &&
                      member?.itv && {
                        "&:hover": {
                          boxShadow: "0 0 25px 20px rgba(237, 162, 107, 0.5)",
                        },
                      }),
                  }}
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
                  bottom: -50,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "90%",
                  maxWidth: 270,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    width: "100%",
                    fontWeight: "bold",
                  }}
                >
                  {member?.name}
                </Typography>
                <Typography
                  variant="h6"
                  color={"primary"}
                  sx={{ textAlign: "center", width: "100%" }}
                >
                  {member?.main_role}
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
