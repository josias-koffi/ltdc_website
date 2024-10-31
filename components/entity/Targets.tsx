import React, { useEffect, useState } from "react";
import { getItems } from "@/libs/directus";
import { FetchProps } from "@/libs/interfaces/Interfaces";
import { Typography } from "@mui/material";
import {
  ActualitiesTargetsEntity,
  TargetsEntity,
} from "@/libs/interfaces/entities";

const Targets = ({ id }: { id: any }) => {
  const [target, setTarget] = useState<TargetsEntity>();

  const filter: FetchProps = {
    entity: "actualities_targets",
    deepFields: true,
    id,
  };

  const fetchData = async () => {
    let res: ActualitiesTargetsEntity[] = await getItems(filter);
    setTarget(res[0]?.targets_id);
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
