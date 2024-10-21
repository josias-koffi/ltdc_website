import React from "react";
import { Box, Button, Collapse, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

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
  const theme = useTheme();
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
      const isDonateButton = item.name === "Faire un Don";

      const buttonStyles = {
        flexShrink: 0,
        minWidth: isDonateButton
          ? { xs: "80px", sm: "70px", md: "120px", lg: "180px" }
          : { xs: "60px", sm: "70px", md: "80px", lg: "90px" },
        maxWidth: isDonateButton
          ? { xs: "90px", sm: "80px", md: "130px", lg: "200px" }
          : undefined,
      };

      return (
        <Button
          key={item.link}
          href={item.link}
          variant={item.variant}
          target={item.target}
          size="small"
          sx={{
            ...buttonStyles,
            ...(isDonateButton && {
              [theme.breakpoints.between(600, 693)]: {
                minWidth: "40px",
                maxWidth: "80px",
              },
              [theme.breakpoints.between(692, 722)]: {
                minWidth: "40px",
                maxWidth: "80px",
              },

              [theme.breakpoints.between(694, 762)]: {
                minWidth: "40px",
                maxWidth: "80px",
              },

              [theme.breakpoints.between(763, 784)]: {
                minWidth: "110x",
                maxWidth: "105px",
              },

              [theme.breakpoints.between(784, 899)]: {
                minWidth: "150x",
                maxWidth: "170px",
              },

              [theme.breakpoints.between(801, 850)]: {
                minWidth: "120px",
              },

              [theme.breakpoints.between(851, 899)]: {
                minWidth: "150px",
              },
            }),
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: {
                xs: "0.75rem",
                sm: "0.75rem",
                md: "0.85rem",
                lg: "0.95rem",
              },
              [theme.breakpoints.between(600, 763)]: {
                fontSize: "0.54rem",
              },
              [theme.breakpoints.between(763, 784)]: {
                fontSize: "0.65rem",
              },
              [theme.breakpoints.between(784, 899)]: {
                fontSize: "0.64rem",
              },
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
          gap: 0.5, 
          overflowX: "auto",
          [theme.breakpoints.between(600, 763)]: {
            justifyContent: "flex-start",
            flexWrap: "nowrap",
            gap: 0.3, 
            "& .MuiButton-root": {
              minWidth: "50px",
              fontSize: "0.65rem",
            },
          },
          [theme.breakpoints.up(692)]: {
            justifyContent: "flex-start",
            gap: 0.5,
            flexWrap: "nowrap",
          },
        }}
      >
        {mapButtons()}
      </Box>
    );
  };

  return props?.normalButton ? normalButton() : expendedButton();
};

export default ButtonList;
