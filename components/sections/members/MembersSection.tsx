"use client"
import React, {useContext} from 'react';
import {Box, Grid, Typography} from "@mui/material"
import {FrameSettingContext, ScreenTypeContext} from "@/app/template";
import Image from "next/image";


const MemberSection = () => {
    const frame = useContext(FrameSettingContext);
    const notPhoneScreen = useContext(ScreenTypeContext);

    const members = [
        {
            name: "TETE UHO",
            role: "CEO",
            photo: "https://images.unsplash.com/photo-1675983679217-7a0636706b4d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "TETE UHO",
            role: "CEO",
            photo: "https://images.unsplash.com/photo-1675983679217-7a0636706b4d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "TETE UHO",
            role: "CEO",
            photo: "https://images.unsplash.com/photo-1675983679217-7a0636706b4d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "TETE UHO",
            role: "CEO",
            photo: "https://images.unsplash.com/photo-1675983679217-7a0636706b4d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "TETE UHO",
            role: "CEO",
            photo: "https://images.unsplash.com/photo-1675983679217-7a0636706b4d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "TETE UHO",
            role: "CEO",
            photo: "https://images.unsplash.com/photo-1675983679217-7a0636706b4d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "TETE UHO",
            role: "CEO",
            photo: "https://images.unsplash.com/photo-1675983679217-7a0636706b4d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "TETE UHO",
            role: "CEO",
            photo: "https://images.unsplash.com/photo-1675983679217-7a0636706b4d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ]

    const mapMembers = () => {
        return members?.map((member: any) => {
            return <Grid
                key={member.name}
                item
                xl={3}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    position: "relative",
                }}>
                <Box
                    sx={{
                        position: "relative",
                        height: 400,
                        width: 300
                    }}>
                    <Image
                        src={member.photo}
                        alt={member.role}
                        fill={true}
                        style={{
                            objectFit: "cover",
                            objectPosition: " right",
                            zIndex: 5
                        }}/>
                </Box>

                <Box sx={{
                    p: 2,
                    zIndex: 9,
                    backgroundColor: "#FFFFFF",
                    height: 40,
                    width: 150,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: 1,
                    borderRadius: 2,
                    position: "absolute",
                    bottom: -50,
                    filter: "drop-shadow(0 0 0.5rem grey)"
                }}>
                    <Typography variant="h6">{member?.name}</Typography>
                    <Typography>{member?.role}</Typography>
                </Box>
            </Grid>
        });
    }

    return (
        <Box
            sx={{
                px: frame?.paddingX,
                py: frame?.paddingY,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 5,
                position: "relative",
            }}
        >
            <Typography variant={notPhoneScreen ? "h2" : "h3"} fontWeight={"bold"} sx={{pb: 5}}>{"Membres"}</Typography>
            <Grid
                container
                spacing={10}
                alignItems="center"
                justifyContent="center"
            >
                {mapMembers()}
            </Grid>
        </Box>
    );
};

export default MemberSection;
