import React from "react";
import { Metadata } from "next";
import ListEmissions from "@/container/emissions-pages/ListEmissions";

export const metadata: Metadata = {
  title: "Émissions | Les Travailleurs du Cœur",
  description:
    "Découvrez les émissions, témoignages et rencontres des Travailleurs du Cœur.",
};

const EmissionsPage = () => <ListEmissions />;

export default EmissionsPage;
