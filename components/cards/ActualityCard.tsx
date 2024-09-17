"use client";
import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const ActualityCard = ({ props }: any) => {
  return (
    <Card>
      <CardMedia
        sx={{ height: 200 }}
        image={process?.env?.NEXT_PUBLIC_BO_URL + "assets/" + props?.cover}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props?.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {props?.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          // href={process?.env?.NEXT_PUBLIC_API_URL + "actualities/" + props?.id}
          href={"http://localhost:3001/" + "actualities/" + props?.id}
        >
          Lire
        </Button>
      </CardActions>
    </Card>
  );
};

export default ActualityCard;
