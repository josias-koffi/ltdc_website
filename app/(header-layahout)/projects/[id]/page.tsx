import React from "react";
import { getItems } from "@/libs/directus";
import { FetchProps } from "@/libs/interfaces/Interfaces";
import { ActualitiesEntity, ProjectEntity } from "@/libs/interfaces/entities";
import { revalidatePath } from "next/cache";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ViewProject from "@/container/projects-pages/view/ViewProject";

const fetchProjects = async (id: string): Promise<ProjectEntity | null> => {
  const request: FetchProps = {
    entity: "projects",
    deepFields: false,
    filter: { id: id },
  };

  const res: ProjectEntity[] = await getItems(request);
  return res.length > 0 ? res[0] : null;
};

// Générer les métadonnées dynamiques
export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const project = await fetchProjects(params.id);

  return {
    title: project?.title || "Project | La LTDC est la pour vous",
    description: project?.description || "Découvrez nos derniers projets",
  };
};

const ProjectView = async ({ params }: { params: { id: string } }) => {
  const project = await fetchProjects(params.id);

  revalidatePath("/projects/[id]", "page");

  if (!project) {
    notFound();
  }

  return <ViewProject project={project} />;
};

export default ProjectView;
