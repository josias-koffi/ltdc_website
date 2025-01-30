import React from "react";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div style={{ paddingTop: "100px" }}>{children}</div>;
};

export default RootLayout;
