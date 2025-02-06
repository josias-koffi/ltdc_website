import React from "react";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div style={{ paddingTop: "115px" }}>{children}</div>;
};

export default RootLayout;
