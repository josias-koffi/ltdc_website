import React from "react";
import ImageWrapper from "@/components/wrapper/ImageWrapper";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ImageWrapper
        src={"/images/notfound.svg"}
        alt={"Rien à affiché pour le moment"}
        objectFit={"contain"}
      />
      <p>{"Rien à affiché pour le moment"}</p>
    </div>
  );
};

export default NotFound;
