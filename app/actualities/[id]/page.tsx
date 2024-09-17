import React from "react";
import { getItems } from "@/libs/directus";
import ViewActualities from "@/container/activities-pages/view-pages/ViewActualities";
import { FetchProps } from "@/libs/interfaces/Interfaces";

const ActualityView = async ({ params }: { params: { id: string } }) => {
  // Fetch les données côté serveur
  const request: FetchProps = {
    entity: "actualities",
    deepFields: true,
    id: params?.id,
  };
  const actuality = await getItems(request);

  return <ViewActualities actuality={actuality[0]} />;
};

export default ActualityView;
