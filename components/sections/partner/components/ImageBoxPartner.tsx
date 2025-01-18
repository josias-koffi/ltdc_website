import React from "react";
import { PartnerImageInterface } from "@/libs/interfaces/Interfaces";
import ImageWrapper from "@/components/wrapper/ImageWrapper";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const ImageBoxPartner = ({
  image,
}: {
  key: any;
  image: PartnerImageInterface;
}) => {
  const router = useRouter();
  const URL_PARTNER = "/images/partners/";

  const returnSrc = (name: string) => {
    return `${URL_PARTNER}${name}`;
  };
  const returnAlt = (name: string) => {
    return `Partenaire ${name}`;
  };

  const navigateToPartnerUrl = () => {
    router.push(image.url);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
        "&:hover": {
          cursor: "pointer",
        },
      }}
      onClick={navigateToPartnerUrl}
    >
      <ImageWrapper
        width={200}
        height={200}
        objectFit={"cover"}
        src={returnSrc(image?.sourceName)}
        alt={returnAlt(image?.name)}
      />
      <Typography
        variant={"body1"}
        sx={{ fontWeight: "bold" }}
        color={"primary"}
      >
        {image?.name}
      </Typography>
    </Box>
  );
};

export default ImageBoxPartner;
