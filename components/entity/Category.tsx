import React, { useEffect, useState } from "react";
import { getItems } from "@/libs/directus";
import { FetchProps } from "@/libs/interfaces/Interfaces";
import { Typography } from "@mui/material";

const Category = ({ id }: { id: number }) => {
  const [category, setCategory] = useState<any>();
  const filter: FetchProps = {
    entity: "categories",
    id,
  };

  const fetchData = async () => {
    let res = await getItems(filter);
    setCategory(res[0]);
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
