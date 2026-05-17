"use client";
import React from "react";
import { Box, Button, Collapse } from "@mui/material";
import { usePathname } from "next/navigation";

interface Props {
  normalButton?: boolean | null;
  expanded?: boolean;
  transparent?: boolean;
}

interface ButtonListProps {
  name: string;
  link: string;
  variant?: "text" | "outlined" | "contained" | undefined;
  target?: "_blank" | undefined;
}

const navLinkSx = (isActive: boolean, transparent: boolean) => ({
  textWrap: "nowrap",
  position: "relative",
  color: isActive ? "secondary.main" : transparent ? "#fff" : "inherit",
  transition: "color 0.3s ease",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 4,
    left: "50%",
    transform: isActive ? "translateX(-50%) scaleX(1)" : "translateX(-50%) scaleX(0)",
    transformOrigin: "center",
    width: "60%",
    height: "2px",
    backgroundColor: "secondary.main",
    transition: "transform 0.25s ease",
  },
  "&:hover::after": {
    transform: "translateX(-50%) scaleX(1)",
  },
});

const ButtonList = (props: Props) => {
  const pathname = usePathname();
  const transparent = props.transparent ?? false;

  const buttonList: ButtonListProps[] = [
    { name: "Accueil", link: "/" },
    { name: "À Propos", link: "/about" },
    { name: "Projets", link: "/projects" },
    { name: "Événements", link: "/events" },
    { name: "Actualités", link: "/actualities" },
    { name: "Nos offres", link: "/offers" },
    { name: "Contact", link: "/contact" },
    {
      name: "Faire un Don",
      link: "https://www.helloasso.com/associations/association-les-travailleurs-du-c-ur/formulaires/1",
      variant: "contained",
      target: "_blank",
    },
  ];

  const mapButtons = () => {
    return buttonList?.map((item: ButtonListProps) => {
      const isActive =
        !item.target &&
        (item.link === "/"
          ? pathname === "/"
          : pathname?.startsWith(item.link));

      return (
        <Button
          key={item.link}
          href={item.link}
          variant={item?.variant}
          target={item?.target}
          sx={item?.variant ? { textWrap: "nowrap" } : navLinkSx(!!isActive, transparent)}
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
          justifyContent: "space-between",
          alignItems: "space-between",
          gap: 1,
          textWrap: "nowrap",
        }}
      >
        {mapButtons()}
      </Box>
    );
  };

  return props?.normalButton ? normalButton() : expendedButton();
};

export default ButtonList;
