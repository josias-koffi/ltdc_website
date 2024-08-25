"use client"
import React, {useContext} from 'react';
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import {Box, Button, Card, CardActions, CardContent, TextField, Typography} from "@mui/material";
import Image from "next/image";
import {ScreenTypeContext} from "@/app/template";
import {ContactInfoInterface} from "@/container/contact-pages/ContactPage";

const FormSection = ({contactInfo, setContactInfo, resetInfo}: {
    contactInfo: ContactInfoInterface,
    setContactInfo: any
    resetInfo: () => void
}) => {


    const notPhoneScreen = useContext(ScreenTypeContext);

    const handleChange = (e: any) => {
        const {value, name} = e.target;
        setContactInfo((pre: any) => {
            return {...pre, [name]: value}
        });
    }

    const handleSubmit = async () => {
        try {
            const res = await fetch("/api/contact",
                {
                    method: "POST",
                    body: JSON.stringify(contactInfo)
                }
            )
        } catch (error) {
            console.log(error)
        }
        resetInfo()
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                py: 10,
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: 600,
                    position: "absolute",
                    zIndex: 1
                }}>
                <Image
                    src={"/images/contactPage/background.png"}
                    alt="Photo de Jed Villejo sur Unsplash"
                    fill={true}
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
                    <Typography
                        variant={notPhoneScreen ? "h3" : "h4"}
                        align={'center'}
                        color={"#FFF"}>{"N'hésitez pas à nous contacter."}
                    </Typography>
                    <Typography
                        variant={notPhoneScreen ? "h3" : "h4"}
                        color={"#FFF"} align={'center'}>
                        {"Nous serons heureux de vous répondre"}
                    </Typography>
                </Box>

                <Card sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: 2,
                    p: 3,
                    width: {xl: 600, md: 500, sm: 350, xs: 300}
                }}>
                    <CardContent
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            gap: 2,
                            width: '100%'
                        }}>
                        <TextField
                            variant={"outlined"}
                            sx={{width: '100%'}}
                            label="Sujet"
                            name="subject"
                            value={contactInfo?.subject?.subject}
                            disabled
                            InputLabelProps={{shrink: true}}
                        />
                        <TextField
                            variant={"outlined"}
                            sx={{width: '100%'}}
                            label="Nom"
                            name="name"
                            onChange={handleChange}
                            value={contactInfo?.name}/>
                        <TextField
                            variant={"outlined"}
                            sx={{width: '100%'}}
                            label="Entreprise"
                            name="company"
                            onChange={handleChange}
                            value={contactInfo?.company}/>
                        <TextField
                            variant={"outlined"}
                            sx={{width: '100%'}}
                            label="Email"
                            name="email"
                            onChange={handleChange}
                            value={contactInfo?.email}
                            type="email"/>
                        <TextField
                            variant={"outlined"}
                            sx={{width: '100%'}}
                            label="Message"
                            name="message"
                            rows={5}
                            multiline
                            onChange={handleChange}
                            value={contactInfo?.message}/>
                    </CardContent>

                    <CardActions sx={{width: '100%'}}>
                        <Button
                            variant="contained"
                            sx={{width: '100%'}}
                            onClick={handleSubmit}
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
