import React, { useEffect, useState } from "react";
import { getItems } from "@/libs/directus";
import { FetchProps } from "@/libs/interfaces/Interfaces";
import { Typography } from "@mui/material";
import {
  ActualitiesTargetsEntity,
  ProjectsTargetsEntity,
  TargetsEntity,
} from "@/libs/interfaces/entities";

const Targets = ({
  id,
  entity,
}: {
  id: any;
  entity: "actualities_targets" | "projects_targets";
}) => {
  const [target, setTarget] = useState<TargetsEntity>();

  const filter: FetchProps = {
    entity: entity,
    deepFields: true,
    filter: { id },
  };

  // ProjectsTargetsEntity
  const fetchData = async () => {
    let res: ActualitiesTargetsEntity[] | ProjectsTargetsEntity[] =
      await getItems(filter);
    setTarget(res[0]?.targets_id);
    // switch (entity) {
    //   case "actualities_targets":
    //     let res: ActualitiesTargetsEntity[] = await getItems(filter);
    //     setTarget(res[0]?.targets_id);
    //     return;
    //   case "projects_targets":
    //     let res: ActualitiesTargetsEntity[] = await getItems(filter);
    //     setTarget(res[0]?.targets_id);
    //     return;
    // }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Typography variant={"h6"} color={"primary"} sx={{ fontWeight: "bold" }}>
      {target?.name}
    </Typography>
  );
};

export default Targets;
