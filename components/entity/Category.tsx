import React, { useEffect, useState } from "react";
import { getItems } from "@/libs/directus";
import { FetchProps } from "@/libs/interfaces/Interfaces";
import { Typography } from "@mui/material";
import {
  ActualitiesCategoriesEntity,
  CategoriesEntity,
} from "@/libs/interfaces/entities";

const Category = ({ id }: { id: any }) => {
  const [category, setCategory] = useState<CategoriesEntity>();
  const filter: FetchProps = {
    entity: "actualities_categories",
    deepFields: true,
    filter: { id },
  };

  const fetchData = async () => {
    let res: ActualitiesCategoriesEntity[] = await getItems(filter);
    setCategory(res?.[0]?.categories_id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Typography variant={"h6"} color={"primary"} sx={{ fontWeight: "bold" }}>
      {category?.name}
    </Typography>
  );
};

export default Category;
