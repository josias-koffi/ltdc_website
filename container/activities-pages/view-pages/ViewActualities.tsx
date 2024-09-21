"use client";
import React from "react";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import ImageWrapper from "@/components/wrapper/ImageWrapper";
import { returnImageUrlById } from "@/libs/stringUtils";

const ViewActualities = ({ actuality }: any) => {
  return (
    <ContainerWrapper>
      <ImageWrapper
        src={returnImageUrlById(actuality?.cover?.id)}
        alt={actuality?.cover?.title}
      />
    </ContainerWrapper>
  );
};

export default ViewActualities;
