import React from "react";
import { Box, Button, Collapse } from "@mui/material";
import Link from "next/link";

interface Props {
  normalButton?: boolean | null;
  expanded?: boolean;
}

interface ButtonListProps {
  name: string;
  link: string;
}

const ButtonList = (props: Props) => {
  const buttonList: ButtonListProps[] = [
    { name: "Accueille", link: "/" },
    {
      name: "A Propos",
      link: "/about",
    },
    { name: "Contact", link: "/contact" },
  ];

  const mapButtons = () => {
    return buttonList?.map((item: ButtonListProps) => {
      return (
        <Button key={item.link} href={item.link}>
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
        }}
      >
        {mapButtons()}
      </Box>
    );
  };

  return props?.normalButton ? normalButton() : expendedButton();
};

export default ButtonList;
