"use client";
import React, { useEffect, useState } from "react";
import { getItems } from "@/libs/directus";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import { Typography } from "@mui/material";
import { updateHtmlAttributes } from "@/libs/stringUtils";

const EsfProgram = () => {
  const [program, setProgram] = useState<any>();

  const handleFetchProgram = () => {
    getItems({ entity: "esf_program" }).then((result: any) => {
      if (!result) return;
      result.content = updateHtmlAttributes(result?.content, {
        img: { class: "blogImage" },
      });
      setProgram(result);
    });
  };

  useEffect(() => {
    handleFetchProgram();
  }, []);

  return (
    <ContainerWrapper containerWidth={"md"} sxProps={{ position: "relative" }}>
      <Typography
        variant={"h4"}
        align={"center"}
        color={"primary"}
        sx={{ pb: 5 }}
      >
        {"ASSOCIATION LTDC STORY"}
      </Typography>
      <div dangerouslySetInnerHTML={{ __html: program?.content }} />
    </ContainerWrapper>
  );
};

export default EsfProgram;
