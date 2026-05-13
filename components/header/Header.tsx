"use client";
import React, { useContext, useState } from "react";
import { Box } from "@mui/material";
import ButtonList from "@/components/header/components/ButtonList";
import { IconMenu2, IconSquareX } from "@tabler/icons-react";
import { ScreenTypeContext } from "@/app/template";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import ImageWrapper from "@/components/wrapper/ImageWrapper";
import { usePathname, useRouter } from "next/navigation";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

const MotionBox = motion(Box);

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isNotMobileScreen = useContext(ScreenTypeContext);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setIsScrolled(y > 80);
  });

  // Transparent effect only on home page
  const backgroundColorAnimated = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255,255,255,0)", "rgba(255,255,255,1)"]
  );
  const boxShadowAnimated = useTransform(
    scrollY,
    [0, 80],
    ["0 0 0 rgba(0,0,0,0)", "0 2px 20px rgba(0,0,0,0.08)"]
  );

  const backgroundColor = isHomePage ? backgroundColorAnimated : "rgba(255,255,255,1)";
  const boxShadow = isHomePage ? boxShadowAnimated : "0 2px 20px rgba(0,0,0,0.08)";

  const handleExpend = () => {
    setExpanded(!expanded);
  };

  return (
    <MotionBox
      style={{
        backgroundColor: expanded ? "rgba(255,255,255,1)" : backgroundColor,
        boxShadow: expanded ? "0 2px 20px rgba(0,0,0,0.08)" : boxShadow,
      }}
      sx={{ position: "fixed", width: "100%", zIndex: 100 }}
    >
      <ContainerWrapper sxProps={{ py: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box
            onClick={() => router.push("/")}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              "&:hover": { cursor: "pointer" },
            }}
          >
            <ImageWrapper
              src={"/icons/logo/LOGO-ENTIER.png"}
              alt={"icon asso"}
              width={80}
              height={70}
              objectFit={"fill"}
            />
            {/*<ImageWrapper*/}
            {/*  src={"/icons/Logo_Association_LTDC_TYPO.svg"}*/}
            {/*  alt={"icon asso"}*/}
            {/*  width={200}*/}
            {/*  height={50}*/}
            {/*  objectFit={"cover"}*/}
            {/*  objectPosition={"center"}*/}
            {/*/>*/}
          </Box>

          {isNotMobileScreen ? null : expanded ? (
            <IconSquareX onClick={handleExpend} />
          ) : (
            <IconMenu2 onClick={handleExpend} color={isHomePage && !isScrolled ? "#fff" : undefined} />
          )}
          <ButtonList normalButton={isNotMobileScreen} expanded={expanded} transparent={isHomePage && !isScrolled && !expanded} />
        </Box>
      </ContainerWrapper>
    </MotionBox>
  );
};

export default Header;
