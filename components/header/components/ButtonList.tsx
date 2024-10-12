import React from "react";
import { Box, Button, Collapse, Typography } from "@mui/material";

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
    { name: "Accueil", link: "/" },
    { name: "A Propos", link: "/about" },
    { name: "Projets", link: "/projects" },
    { name: "Événements", link: "/events" },
    { name: "Actualités", link: "/actualities" },
    { name: "Adhésion", link: "/contact/as-beneficiary" },
    { name: "Partenaires", link: "/contact/as-sponsor" },
    { name: "Contact", link: "/contact/general" },
    {
      name: "Faire un Don",
      link: "https://www.helloasso.com/associations/association-les-travailleurs-du-coeur/collectes/campagne-de-crowdfunding-pour-etablir-un-siege-social",
      variant: "contained",
      target: "_blank",
    },
  ];

  const mapButtons = () => {
    return buttonList?.map((item: ButtonListProps) => {
      const isDonateButton = item.name === "Faire un Dons";
      
      const buttonStyles = {
        flexShrink: 0,
        minWidth: isDonateButton
          ? { xs: "60px", sm: "55px", md: "90px", lg: "140px" }
          : { xs: "40px", sm: "45px", md: "60px", lg: "70px" },
        maxWidth: isDonateButton
          ? { xs: "75px", sm: "70px", md: "110px", lg: "160px" }
          : undefined,
      };
  
      return (
        <Button
          key={item.link}
          href={item.link}
          variant={item.variant}
          target={item.target}
          size="small"
          sx={buttonStyles}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.75rem", md: "0.85rem", lg: "0.95rem" }
            }}
          >
            {item.name}
          </Typography>
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
