"use client"
import React, {useContext, useState} from 'react';
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import {Box, Grid, Typography, useTheme} from "@mui/material";
import subjects from "./subjects.json"
import {ScreenTypeContext} from "@/app/template";
import Image from "next/image";


interface SubjectProps {
    setSubject: (subject: string) => void;
}

interface SubjectStateInterface {
    id: number,
    image: string,
    subject: string
}

const SubjectSection = (props: SubjectProps) => {
    const theme = useTheme()

    const [selectedSubject, setSelectedSubject] = useState<SubjectStateInterface>()
    const notPhoneScreen = useContext(ScreenTypeContext);

    const SubjectCards = () => {
        return <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={5}
            sx={{
                color: "#fff",
                pt: 5
            }}
        >
            {subjects?.map((subject: SubjectStateInterface) => {
                return <Grid
                    key={subject.id}
                    item
                    xl={4}
                    md={4}
                    sm={12}
                    xs={12}
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
                            backgroundColor: theme.palette.primary.main,
                            borderRadius: 2,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "center",
                            p: 5,
                            gap: 2,
                        }}
                    >
                        <Image
                            src={subject.image}
                            alt={`${subject.subject}icon`}
                            width={80}
                            height={80}
                        />
                        <Typography variant={notPhoneScreen ? "h4" : "h5"}>
                            {subject?.subject}
                        </Typography>
                    </Box>

                </Grid>
            })}
        </Grid>
    }

    return (
        <ContainerWrapper sxProps={{py: 10}}>
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                <Typography variant={"h3"} fontWeight={"bold"} align={"center"} sx={{pb: 5}}>
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
