"use client"
import React, {useContext} from 'react';
import {FrameSettingContext, ScreenTypeContext} from "@/app/template";
import {Box, Grid, Typography} from "@mui/material";
import assoHistory from "./AssoHistory.json";
import Image from "next/image";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";

const AssoHistorySection = () => {

    const {text} = assoHistory
    const frame = useContext(FrameSettingContext);
    const notPhoneScreen = useContext(ScreenTypeContext);

    const cleanAndFormatText = (text: string) => {
        return text.replace(/\n/g, '<br/>'); // Remplace tous les caractères \u200B par des retours à la ligne
    };

    const cleanedAndFormattedText = cleanAndFormatText(text);

    const renderImages = () => {

    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                backgroundColor: "#F5EFE0",
                py: 5
            }}
        >
            <ContainerWrapper>
                <Grid
                    container
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                >
                    <Grid item xl={6}>
                        <Typography variant={notPhoneScreen ? "h2" : "h3"} fontWeight={"bold"}
                                    sx={{pb: 5}}  >{"Notre Histoire"}</Typography>
                        <Typography component="div" dangerouslySetInnerHTML={{__html: cleanedAndFormattedText}} color={"text.secondary"}/>
                    </Grid>
                    <Grid item xl={6}
                          sx={{position: "relative", display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <Box sx={{height: 600, width: 350, position: "relative"}}>
                            <Image
                                src={"/images/aboutPage/historySection.png"}
                                alt="Asso image of peoples"
                                fill={true}
                                style={{
                                    objectFit: "contain",
                                    objectPosition: " right",
                                    zIndex: 5
                                }}/>
                        </Box>
                    </Grid>
                </Grid>
            </ContainerWrapper>
        </Box>
    );
};

export default AssoHistorySection;
