import React from "react";
import { Box, Button, Collapse } from "@mui/material";

interface Props {
  normalButton?: boolean | null;
  expanded?: boolean;
}

interface ButtonListProps {
  name: string;
  link: string;
  variant?: "text" | "outlined" | "contained" | undefined;
  target?: "_blank" | undefined;
}

const ButtonList = (props: Props) => {
  const buttonList: ButtonListProps[] = [
    {
      name: "Accueil",
      link: "/",
    },
    {
      name: "À Propos",
      link: "/about",
    },
    // {
    //   name: "Projets",
    //   link: "/projects",
    // },
    {
      name: "Événements",
      link: "/events",
    },
    {
      name: "Actualités",
      link: "/actualities",
    },
    {
      name: "Adhésion",
      link: "/contact/as-beneficiary",
    },
    {
      name: "Partenaires",
      link: "/contact/as-sponsor",
    },
    {
      name: "Contact",
      link: "/contact/general",
    },
    {
      name: "Faire un Don",
      link: "https://www.helloasso.com/associations/association-les-travailleurs-du-coeur/formulaires/1",
      variant: "contained",
      target: "_blank",
    },
  ];
  const mapButtons = () => {
    return buttonList?.map((item: ButtonListProps) => {
      return (
        <Button
          key={item.link}
          href={item.link}
          variant={item?.variant}
          target={item?.variant}
        >
          {item?.name}
        </Button>
      );
    });
  };

  const expendedButton = () => {
    return (
      <Collapse
        sx={{ width: "100%" }}
        in={props?.expanded}
        timeout="auto"
        unmountOnExit
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          {mapButtons()}
        </Box>
      </Collapse>
    );
  };

  const normalButton = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        {mapButtons()}
      </Box>
    );
  };

  return props?.normalButton ? normalButton() : expendedButton();
};

export default ButtonList;
