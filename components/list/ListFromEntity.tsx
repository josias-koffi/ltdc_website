"use client";
import React, { useEffect, useState } from "react";
import { getItems } from "@/libs/directus";
import { Box, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import PaginationFooter from "@/components/pagination/PaginationFooter";
import { EntityInterface, FetchProps } from "@/libs/interfaces/Interfaces";
import NotFound from "@/components/NotFound";

interface ListFromEntityProps {
  entity: EntityInterface["name"];
  CardType: unknown;
  itemsSize?: { xl?: number; md?: number; sm?: number; xs?: number };
  filter?: FetchProps["filter"];
}

const DEFAULT_SIZE = { xl: 4, md: 6, sm: 12, xs: 12 };
const LIMIT = 6;

const CardSkeleton = ({
  size,
}: {
  size: { xl?: number; md?: number; sm?: number; xs?: number };
}) => (
  <Grid size={size}>
    <Skeleton variant="rectangular" height={220} sx={{ borderRadius: 1, mb: 1 }} />
    <Skeleton variant="text" height={32} width="70%" />
    <Skeleton variant="text" height={20} width="90%" />
    <Skeleton variant="text" height={20} width="60%" />
    <Skeleton variant="rectangular" height={36} width={80} sx={{ mt: 1, borderRadius: 1, ml: "auto" }} />
  </Grid>
);

const ListFromEntity = ({
  entity,
  CardType,
  itemsSize,
  filter,
}: ListFromEntityProps) => {
  const [data, setData] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const size = itemsSize ?? DEFAULT_SIZE;

  const fetchData = async () => {
    setLoading(true);
    const request: FetchProps = {
      entity: entity,
      limit: LIMIT,
      page: currentPage,
      filter,
    };
    try {
      const res = await getItems(request);
      if (res?.length > 0) {
        setData(res.reverse());
      } else {
        setData([]);
      }
    } catch (error: unknown) {
      console.error(error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <ContainerWrapper sxProps={{ py: 0, pb: 5 }}>
      {loading ? (
        <Grid
          container
          direction="row"
          sx={{ justifyContent: "flex-start", alignItems: "flex-start" }}
          spacing={2}
        >
          {Array.from({ length: LIMIT }).map((_, i) => (
            <CardSkeleton key={i} size={size} />
          ))}
        </Grid>
      ) : data?.length === 0 ? (
        <NotFound />
      ) : (
        <Box>
          <Grid
            container
            direction="row"
            sx={{ justifyContent: "flex-start", alignItems: "flex-start" }}
            spacing={2}
          >
            {data?.map((item: unknown) => {
              const typedItem = item as { id: string | number };
              const Card = CardType as React.ComponentType<{ props: unknown }>;
              return (
                <Grid key={typedItem.id} size={size}>
                  <Card props={item} />
                </Grid>
              );
            })}
          </Grid>
          <PaginationFooter
            limit={LIMIT}
            entity={entity}
            filter={filter}
            page={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Box>
      )}
    </ContainerWrapper>
  );
};

export default ListFromEntity;
