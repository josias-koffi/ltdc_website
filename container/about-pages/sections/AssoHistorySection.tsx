"use client"
import React, {useContext} from 'react';
import {FrameSettingContext, ScreenTypeContext} from "@/app/template";
import {Box, Grid,Typography} from "@mui/material";
import assoHistory from "./AssoHistory.json"

const AssoHistorySection = () => {

    const {text}=assoHistory
    const frame = useContext(FrameSettingContext);
    const notPhoneScreen = useContext(ScreenTypeContext);

    const cleanAndFormatText = (text:string) => {
        return text.replace(/\n/g, '<br/>'); // Remplace tous les caractères \u200B par des retours à la ligne
    };

    const cleanedAndFormattedText = cleanAndFormatText(text);

    const renderImages=()=>{

    }

    return (
        <Box
            sx={{
                px: frame?.paddingX,
                py: frame?.paddingY,
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                backgroundColor: "#F5EFE0"
            }}
        >
            <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                spacing={1}
            >
                <Grid item xl={6}>
                <Typography variant={notPhoneScreen ? "h2" : "h3"} fontWeight={"bold"} sx={{pb:5}}>{"Notre Histoire"}</Typography>
                    <Typography component="div" dangerouslySetInnerHTML={{ __html: cleanedAndFormattedText }} color="primary" />
                </Grid>
                <Grid item xl={6}>
                    <Typography>{"Notre Histoire"}</Typography>
                    <Typography component="div" dangerouslySetInnerHTML={{ __html: cleanedAndFormattedText }}/>
                </Grid>
            </Grid>

        </Box>
    );
};

export default AssoHistorySection;
