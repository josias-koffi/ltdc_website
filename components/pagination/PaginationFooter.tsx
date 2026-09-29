"use client";
import React, { useEffect } from "react";
import { Pagination, Stack } from "@mui/material";
import { getTotalPostCount } from "@/libs/directus";
import { EntityInterface, FetchProps } from "@/libs/interfaces/Interfaces";

interface Props {
  limit: number;
  entity: EntityInterface["name"];
  filter?: FetchProps["filter"];
  page: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

// La page courante est portée par le parent : ce composant est démonté pendant
// chaque chargement, un état local repartirait à la page 1.
const PaginationFooter = ({
  limit,
  entity,
  filter,
  page,
  setCurrentPage,
}: Props) => {
  const [totalPostCount, setTotalPostCount] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const totalPostCount = await getTotalPostCount(entity, filter);
      const totalPages = Math.ceil(totalPostCount / limit);
      setTotalPostCount(totalPages);
    } catch (error: any) {
      console.log(error);
    }
  };

  const hasMorePage = () => {
    const recievedPostsCount = limit * totalPostCount;
    return recievedPostsCount < totalPostCount;
  };

  return (
    <Stack spacing={2} sx={{ width: "100%", pt: 5 }}>
      <Pagination count={totalPostCount} page={page} onChange={handleChange} />
    </Stack>
  );
};

export default PaginationFooter;
