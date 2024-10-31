"use client";
import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Stack,
} from "@mui/material";
import Category from "@/components/entity/Category";
import { truncateText } from "@/libs/stringUtils";
import { formatDate } from "@/libs/dateutils";
import { ActualitiesEntity } from "@/libs/interfaces/entities";

const ActualityCard = ({ props }: { props: ActualitiesEntity }) => {
  return (
    <Card>
      <CardMedia
        sx={{ height: 220 }}
        image={process?.env?.NEXT_PUBLIC_BO_URL + "assets/" + props?.cover}
        title="green iguana"
      />
      <CardContent sx={{ height: 100 }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            color: "text.secondary",
          }}
        >
          <Category id={props?.id} />
          <Typography>{formatDate(props?.publication_date)}</Typography>
        </Stack>
        <Typography gutterBottom variant="h5" component="div">
          {props?.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
          {truncateText(props?.description)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", pt: 5 }}>
        <Button variant={"contained"} href={"actualities/" + props?.id}>
          Lire
        </Button>
      </CardActions>
    </Card>
  );
};

export default ActualityCard;
