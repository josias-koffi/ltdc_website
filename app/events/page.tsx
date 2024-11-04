import React from "react";
import { revalidatePath } from "next/cache";
import ListEvents from "@/container/asso-life-pages/events/ListEvents";

const Events = () => {
  revalidatePath("/events", "page");
  return <ListEvents />;
};

export default Events;
