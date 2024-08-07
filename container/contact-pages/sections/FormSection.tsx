"use client"
import React, {useContext} from 'react';
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import {Box, Button, Card, CardActions, CardContent, TextField, Typography} from "@mui/material";
import Image from "next/image";
import {ScreenTypeContext} from "@/app/template";

const FormSection = () => {
    const notPhoneScreen = useContext(ScreenTypeContext);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                py: 10,
            }}
        >
            <Box sx={{width: "100%", height: 600, position: "absolute", zIndex: 1}}>
                <Image src={"/images/contactPage/background.png"} alt="Photo de Jed Villejo sur Unsplash" fill={true}
                       style={{objectFit: "fill", objectPosition: " center"}}/>
            </Box>
            <ContainerWrapper sxProps={{
                position: 'relative',
                zIndex: 10,
                flexDirection: "column",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 5
            }}>
                <Box>
                    <Typography variant={notPhoneScreen ? "h3" : "h4"} align={'center'}
                                color={"#FFF"}>{"N'hésitez pas à nous contacter."}</Typography>
                    <Typography variant={notPhoneScreen ? "h3" : "h4"} color={"#FFF"} align={'center'}>{
                        "Nous serons heureux d’avoir de vos repondre"}</Typography>
                </Box>

                <Card sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: 2,
                    p: 3,
                    width: {xl: 600, sm: 350,xs:350}
                }}>

                    <CardContent
                        sx={{display: "flex", alignItems: "center", flexDirection: "column", gap: 2, width: '100%'}}>
                        <TextField variant={"outlined"} sx={{width: '100%'}} label="Nom"/>
                        <TextField variant={"outlined"} sx={{width: '100%'}} label="Entreprise"/>
                        <TextField variant={"outlined"} sx={{width: '100%'}} label="Email"/>
                        <TextField variant={"outlined"} sx={{width: '100%'}} label="Sujet"/>
                        <TextField variant={"outlined"} sx={{width: '100%'}} label="Message" rows={10} multiline  />
                    </CardContent>

                    <CardActions sx={{width: '100%'}}>
                        <Button
                            variant="contained"
                            sx={{width: '100%'}}
                        >
                            {"Envoyer"}
                        </Button>
                    </CardActions>
                </Card>

            </ContainerWrapper>
        </Box>

);
};

export default FormSection;
