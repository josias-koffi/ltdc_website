"use client"
import React from 'react';
import {Box, Typography} from "@mui/material"
import Image from 'next/image'
import aboutHeadInfo from "./aboutHead.json"
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";


const AboutHeadSection = () => {
    const {image, description} = aboutHeadInfo
    return (
        <ContainerWrapper sxProps={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            position: "relative",
            py:5
        }}>
            <Box sx={{width: "100%", height: 300, position: "relative", zIndex: 1}}>
                <Image src={image} alt="Photo de Jed Villejo sur Unsplash" fill={true}
                       style={{objectFit: "cover", borderRadius: 10, objectPosition: " right"}}/>
            </Box>
            <Typography variant="body1" align={"center"}>{description}</Typography>
        </ContainerWrapper>
    );
};

export default AboutHeadSection;
