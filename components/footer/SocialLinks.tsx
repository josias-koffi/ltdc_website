import React from "react";
import { Box, IconButton } from "@mui/material";
import { IconBrandInstagram, IconBrandLinkedin } from "@tabler/icons-react";

const SocialLinks = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 3,
        flexWrap: "no-wrap",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <IconButton
        href={"https://www.instagram.com/association_ltdc/"}
        aria-label="instagram"
        target="_blank"
      >
        <IconBrandInstagram color="white" size={30} />
      </IconButton>
      <IconButton
        href={"https://www.linkedin.com/in/association-ltdc-a58942324/"}
        aria-label="linkedin"
        target="_blank"
      >
        <IconBrandLinkedin color="white" size={30} />
      </IconButton>
    </Box>
  );
};

export default SocialLinks;
