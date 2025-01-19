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
import { truncateText } from "@/libs/stringUtils";
import { OfferEntity } from "@/libs/interfaces/entities";

const OfferCard = ({ props }: { props: OfferEntity }) => {
  return (
    <Card>
      <CardContent sx={{ height: 100 }}>
        <Typography gutterBottom color={"primary"} variant="h5" component="div">
          {props?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: "text.secondary" }}
          dangerouslySetInnerHTML={{
            __html: truncateText(props?.description, 300),
          }}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", pt: 5 }}>
        <Button variant={"contained"} href={"offers/" + props?.id}>
          {"Voir l'offre"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default OfferCard;
