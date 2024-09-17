"use client";
import React, { useEffect } from "react";
import { Pagination, Stack } from "@mui/material";
import { getTotalPostCount } from "@/libs/directus";
import { EntityInterface } from "@/libs/interfaces/mailType";

interface Props {
  limit: number;
  entity: EntityInterface["name"];
  page: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationFooter = ({ limit, entity, setCurrentPage }: Props) => {
  const [page, setPage] = React.useState(1);
  const [totalPostCount, setTotalPostCount] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const totalPostCount = await getTotalPostCount(entity);
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
