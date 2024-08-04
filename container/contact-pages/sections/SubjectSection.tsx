"use client"
import React, {useContext, useState} from 'react';
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import {Box, Grid, Typography} from "@mui/material";
import subjects from "./subjects.json"
import {ScreenTypeContext} from "@/app/template";

interface SubjectProps {
    setSubject: (subject: string) => void;
}

interface SubjectStateInterface {
    id: number,
    image: string,
    subject: string
}

const SubjectSection = (props: SubjectProps) => {

    const [selectedSubject, setSelectedSubject] = useState<SubjectStateInterface>()
    const notPhoneScreen = useContext(ScreenTypeContext);

    const SubjectCards = () => {
        return <Grid container>
            {subjects?.map((subject: SubjectStateInterface) => {
                return <Grid key={subject.id} item xl={4}>
                    <Typography variant={notPhoneScreen ? "h2" : "h3"} sx={{pb: 3}}>
                        {subject?.subject}
                    </Typography>
                    <Typography variant={notPhoneScreen ? "h4" : "h5"}>
                        {subject?.subject}
                    </Typography>
                    <Typography variant="body1">{subject?.subject}</Typography>
                </Grid>
            })}
        </Grid>
    }

    return (
        <ContainerWrapper sxProps={{py: 10}}>
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                <Typography variant={"h3"} fontWeight={"bold"}>
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
