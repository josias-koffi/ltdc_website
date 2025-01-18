import React from "react";
import { Role } from "@/libs/interfaces/entities";

const MappingRoles = ({ roles }: { roles: Role[] }) => {
  let finalRole = "";
  const maxlength = roles?.length;

  const returnPonctuation = (index: number) => {
    return index < maxlength - 1 ? " / " : " ";
  };

  roles?.forEach((role, index) => {
    finalRole = finalRole.concat(role + returnPonctuation(index));
  });

  return finalRole;
};

export default MappingRoles;
