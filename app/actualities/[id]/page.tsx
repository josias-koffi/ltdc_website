import React from "react";
import { getItems } from "@/libs/directus";
import ViewActualities from "@/container/activities-pages/view-pages/ViewActualities";

const ActualityView = async ({ params }: { params: { id: string } }) => {
  // Fetch les données côté serveur
  const actuality = await getItems("actualities", true, params?.id);

  return <ViewActualities actuality={actuality[0]} />;
};

export default ActualityView;
