"use client";
import React, { useEffect, useState } from "react";
import { EntityInterface } from "@/libs/interfaces/mailType";
import { getItems } from "@/libs/directus";
import Grid from "@mui/material/Unstable_Grid2";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import PaginationFooter from "@/components/pagination/PaginationFooter";
import { FetchProps } from "@/libs/interfaces/Interfaces";

interface ListFromEntityProps {
  entity: EntityInterface["name"];
  CardType: any;
}

const ListFromEntity = ({ entity, CardType }: ListFromEntityProps) => {
  const [data, setData] = useState<any[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const LIMIT = 6;

  const fetchData = async () => {
    const request: FetchProps = {
      entity: entity,
      limit: LIMIT,
      page: currentPage,
    };
    try {
      const res = await getItems(request);
      if (res?.length > 0) {
        setData(res);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <ContainerWrapper sxProps={{ py: 0, pb: 5 }}>
      <Grid
        container
        direction="row"
        sx={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
        spacing={2}
      >
        {data?.map((item: any) => (
          <Grid key={item.id} item xl={4} md={6} sm={12} xs={12}>
            <CardType props={item} />
          </Grid>
        ))}
      </Grid>
      <PaginationFooter
        limit={LIMIT}
        entity={entity}
        page={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </ContainerWrapper>
  );
};

export default ListFromEntity;
