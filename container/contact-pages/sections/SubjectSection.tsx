"use client";
import React, { useContext, useEffect, useState } from "react";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import { Box, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import subjects from "./subjects.json";
import { ScreenTypeContext } from "@/app/template";
import Image from "next/image";
import { SubjectStateInterface } from "@/libs/interfaces/Interfaces";

interface SubjectProps {
  setSubject: (subject: any) => void;
  activeIndex: number | undefined;
}

const SubjectSection = (props: SubjectProps) => {
  const theme = useTheme();
  const { setSubject } = props;

  const [selectedSubject, setSelectedSubject] =
    useState<SubjectStateInterface>();
  const notPhoneScreen = useContext(ScreenTypeContext);

  const handleSelectSubject = (subject: SubjectStateInterface) => {
    setSelectedSubject(subject);
  };

  useEffect(() => {
    setSelectedSubject(subjects[0]);
  }, []);

  useEffect(() => {
    setSubject((pre: any) => {
      return { ...pre, subject: selectedSubject };
    });
  }, [selectedSubject]);

  const SubjectCards = () => {
    return (
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={5}
        sx={{
          color: "#fff",
          pt: 3,
        }}
      >
        {subjects?.map((subject: SubjectStateInterface) => {
          return (
            <Grid
              key={subject.id}
              size={{ xl: 4, md: 6, sm: 12, xs: 12 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "stretch",
                p: 1,
              }}
            >
              <Box
                sx={{
                  backgroundColor:
                    subject?.id === props?.activeIndex
                      ? theme.palette.primary.main
                      : "#C0C0C0 ",
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  gap: 2,
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => {
                  handleSelectSubject(subject);
                }}
              >
                <Image
                  src={subject.image}
                  alt={`${subject.subject}icon`}
                  width={48}
                  height={48}
                />
                <Typography variant={notPhoneScreen ? "h5" : "h6"}>
                  {subject?.subject}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <ContainerWrapper sxProps={{ py: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant={"h3"}
          fontWeight={"bold"}
          align={"center"}
          sx={{ pb: 5 }}
        >
          {"VOUS AVEZ UNE QUESTION ? "}
        </Typography>
        <Typography variant={"h5"} fontWeight={"bold"}>
          {"Raison pour laquelle vous nous contactez"}
        </Typography>
      </Box>
      {SubjectCards()}
    </ContainerWrapper>
  );
};

export default SubjectSection;
