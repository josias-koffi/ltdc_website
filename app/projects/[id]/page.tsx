import React from "react";
import { getItems } from "@/libs/directus";
import { FetchProps } from "@/libs/interfaces/Interfaces";

const ProjectView = async ({ params }: { params: { id: string } }) => {
  // Fetch les données côté serveur
  const request: FetchProps = {
    entity: "projects",
    deepFields: true,
    id: params?.id,
  };
  const projects = await getItems(request);
  return <div></div>;
};

export default ProjectView;
