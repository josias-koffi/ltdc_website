"use client";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import { getItems } from "@/libs/directus";
import { trierParCle } from "@/libs/arrayLibs";

const TermesOfUsesMapping = () => {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    getItems({ entity: "terms_of_use" }).then((result: any) => {
      setArticles(trierParCle(result, "order"));
    });
  }, []);

  const mappedConditions = () =>
    articles?.map((condition: any) => {
      return (
        <div key={condition?.id}>
          <Typography variant={"h5"} color={"primary"}>
            {condition?.title}
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: condition?.content }} />
        </div>
      );
    });

  return (
    <ContainerWrapper containerWidth={"md"}>
      <Typography
        variant={"h4"}
        align={"center"}
        color={"primary"}
        sx={{ pb: 5 }}
      >
        {"MENTIONS LÉGALES"}
      </Typography>
      {mappedConditions()}
    </ContainerWrapper>
  );
};

export default TermesOfUsesMapping;
