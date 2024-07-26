import React from 'react';
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import {Box,Typography} from "@mui/material";

const SubjectSection = () => {
    return (
        <ContainerWrapper sxProps={{py:10}}>
            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                <Typography variant={"h3"} fontWeight={"bold"}>
                    {"VOUS AVEZ UNE QUESTION ? "}
                </Typography>
                <Typography variant={"h5"} fontWeight={"bold"}>
                    {"Raison pour laquelle vous nous contactez"}
                </Typography>
            </Box>

        </ContainerWrapper>
    );
};

export default SubjectSection;
