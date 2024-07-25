"use client"
import React, {useContext} from 'react';
import {Box, Typography} from "@mui/material"
import Image from 'next/image'
import aboutHeadInfo from "./aboutHead.json"
import {FrameSettingContext, ScreenTypeContext} from "@/app/template";


const AboutHeadSection = () => {
    const frame = useContext(FrameSettingContext);
    const notPhoneScreen = useContext(ScreenTypeContext);
    const {image, description} = aboutHeadInfo
    return (
        <Box
            sx={{
                px: frame?.paddingX,
                py: frame?.paddingY,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
                position: "relative",
            }}
        >
            <Box sx={{width: "100%", height: 300, position: "relative", zIndex: 1}}>
                <Image src={image} alt="Photo de Jed Villejo sur Unsplash" fill={true}
                       style={{objectFit: "cover", borderRadius: 10,objectPosition:" right"}}/>
            </Box>
            <Typography variant="body1" align={"center"}>{description}</Typography>
        </Box>
    );
};

export default AboutHeadSection;
