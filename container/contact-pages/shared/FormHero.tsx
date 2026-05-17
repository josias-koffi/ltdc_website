"use client";
import React from "react";
import {Box, Typography} from "@mui/material";
import Image from "next/image";

interface Props {
    title: string;
    subtitle?: string;
}

const FormHero = ({title, subtitle}: Props) => {
    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                minHeight: {xs: 140, md: 200},
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}
        >
            <Image
                src="/images/contactPage/background.png"
                alt=""
                fill
                style={{objectFit: "cover", objectPosition: "center"}}
                priority
            />
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(100,39,117,0.35) 0%, rgba(100,39,117,0.65) 100%)",
                }}
            />
            <Box sx={{position: "relative", zIndex: 1, textAlign: "center", px: 3, py: 4}}>
                <Typography
                    variant="h3"
                    sx={{color: "#fff", fontWeight: 700, fontSize: {xs: 26, md: 38}}}
                >
                    {title}
                </Typography>
                {subtitle && (
                    <Typography
                        variant="body1"
                        sx={{color: "rgba(255,255,255,0.92)", mt: 1, maxWidth: 640, mx: "auto"}}
                    >
                        {subtitle}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default FormHero;
