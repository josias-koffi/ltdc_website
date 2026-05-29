"use client";
import React from "react";
import { Card, Box, Chip, Typography, Divider, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ImageWrapper from "@/components/wrapper/ImageWrapper";
import { EventInterface } from "@/libs/interfaces/entities";
import { returnImageUrlById, truncateText } from "@/libs/stringUtils";
import SocialLinks from "@/components/footer/SocialLinks";
import { formatDate } from "@/libs/dateutils";

const EventCard = ({ props }: { props: EventInterface }) => {
  const returnPriceChip = () => {
    let pricing = props?.price === 0 ? "Gratuit" : "Payant";
    return (
      <Chip
        key={props?.name}
        label={`${pricing} : ${props?.price}€`}
        sx={{ fontWeight: "bold" }}
        color={"primary"}
      />
    );
  };

  return (
    <Card sx={{ borderRadius: 5 }}>
      <Grid container spacing={1} sx={{ width: "100%" }}>
        <Grid size={{ xs: 12, sm: 12, md: 4, xl: 4 }}>
          <ImageWrapper
            src={returnImageUrlById(props?.cover)}
            alt={props?.name}
            height={353}
          />
        </Grid>
        <Grid
          size={{ xs: 12, sm: 12, md: 8, xl: 8 }}
          sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}
        >
          <Box sx={{ display: "flex", flexDirection: "flex-start", gap: 1 }}>
            <Chip
              color={"secondary"}
              sx={{ fontWeight: "bold" }}
              label={props?.type}
            />
            {returnPriceChip()}
          </Box>
          <Typography variant={"h4"}>{props?.name}</Typography>
          <Typography variant={"body1"} color={"text.secondary"}>
            {truncateText(props.description, 400)}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Chip
              label={formatDate(
                props?.start_date,
                "dddd D MMMM YYYY [à] HH [h] mm",
              )}
              sx={{
                m: 1,
                backgroundColor: "#F2F2F2",
                fontWeight: "bold",
                color: "#5F5F75",
                fontSize: 16,
                maxWidth: "100%",
                height: "auto",
                "& .MuiChip-label": {
                  whiteSpace: "normal",
                  py: 0.75,
                },
              }}
            />
            <Typography
              variant={"subtitle2"}
              sx={{
                m: 1,
                fontWeight: "bold",
                color: "#5F5F75",
                minWidth: 0,
                overflowWrap: "anywhere",
              }}
            >
              {props?.address}
            </Typography>
          </Box>
          <Divider />

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              overflow: "visible",
            }}
          >
            <Button
              variant={"contained"}
              href={props.link}
              target={"_blank"}
              sx={{ backgroundColor: "#F2F2F2", color: "#642775" }}
            >
              {"Faire un don "}👈
            </Button>

            <Typography
              variant={"subtitle1"}
            >{`${props?.capacity} participants maximum`}</Typography>

            {props?.instagram || props?.linkedin ? <Divider /> : null}
            <SocialLinks
              preset={false}
              instagram={props.instagram}
              linkedin={props.linkedin}
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default EventCard;
