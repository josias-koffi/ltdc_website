"use client";
import React from "react";
import { Box, Card } from "@mui/material";

const FormCardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 6 },
        position: "relative",
        zIndex: 2,
      }}
    >
      <Card
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 720,
          p: { xs: 3, md: 5 },
          borderRadius: 3,
        }}
      >
        {children}
      </Card>
    </Box>
  );
};

export default FormCardWrapper;
