"use client";

import React from "react";
import RubriqueHead from "@/components/sections/RubriqueHead";
import ListFromEntity from "@/components/list/ListFromEntity";
import EmissionCard from "@/components/cards/EmissionCard";
import { COVER_WITH_FOCAL_POINT_FIELDS } from "@/libs/stringUtils";

const ListEmissions = () => {
  return (
    <>
      <RubriqueHead
        title="Les émissions de la LTDC"
        description="Découvrez les émissions de la LTDC : des témoignages, des rencontres et des sujets qui mettent en lumière nos actions et celles de notre communauté. Retrouvez régulièrement ici nos nouveaux épisodes."
        imageAlt="Les émissions de la LTDC"
        imageUrl="/images/banners/Banniere_Teasing_Octobre Rose.PNG"
      />
      <ListFromEntity
        entity="emissions"
        CardType={EmissionCard}
        fields={COVER_WITH_FOCAL_POINT_FIELDS}
        sort={["-publication_date", "-id"]}
      />
    </>
  );
};

export default ListEmissions;
