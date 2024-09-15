"use client";
import React, { useEffect, useState } from "react";
import { EntityInterface } from "@/libs/interfaces/mailType";
import { getItems } from "@/libs/directus";
import Grid from "@mui/material/Unstable_Grid2";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";

interface ListFromEntityProps {
  entity: EntityInterface["name"];
  CardType: any;
}

const ListFromEntity = ({ entity, CardType }: ListFromEntityProps) => {
  const [data, setData] = useState<any[]>();

  const fetchData = async () => {
    try {
      const res = await getItems(entity);
      console.log(res);
      if (res?.length > 0) {
        setData(res);
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ContainerWrapper>
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
    </ContainerWrapper>
  );
};

export default ListFromEntity;
