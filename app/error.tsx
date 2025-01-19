"use client";
import { useEffect } from "react";
import { Typography, Button } from "@mui/material";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <ContainerWrapper
      sxProps={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        justifyItems: "center",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        minHeight: 500,
      }}
    >
      <Typography className="text-center">
        {error?.message ?? "Une erreur est survenue!"}
      </Typography>
      <Button
        variant="outlined"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        {"Réessayez"}
      </Button>
    </ContainerWrapper>
  );
}
