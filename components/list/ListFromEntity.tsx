"use client";
import React, { useEffect, useState } from "react";
import { EntityInterface } from "@/libs/interfaces/mailType";
import { getItems } from "@/libs/directus";

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

  return <div></div>;
};

export default ListFromEntity;
