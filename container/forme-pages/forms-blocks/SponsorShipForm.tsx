"use client"
import React, {useContext, useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Checkbox,
    FormControlLabel,
    TextField,
    Typography
} from "@mui/material";
import Image from "next/image"
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import {ScreenTypeContext} from "@/app/template";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

interface DataInterface {
    name: string;
    firstName: string;
    birthday: string;
    nationality: string;
    adresse: string;
    phoneNumber: number;
    email: string;
    statut: string;
    dateArrived: string;
    object: string;
    message: string;
    organization: string;
    sector: string;
    organizationAddress: string;
    organizationPhone: string;
    organizationEmail: string;
    motivation: string;
    partnershipType: string;
    skillsAndRessources: string;
    partnershipExperiences: string;
    consent:boolean;
}

interface Props {
    countyFlags: any[] | undefined
}

const SponsorShipForm = (props: Props) => {
    const [data, setData] = useState<DataInterface | undefined>()

    const notPhoneScreen = useContext(ScreenTypeContext);

    const handleChange = (e: any) => {
        const {value, name} = e.target;
        setData((pre: any) => {
            return {...pre, [name]: value}
        });
    }
    const handleChangeDate = (e: any, field: "birthday" | "dateArrived") => {
        console.log(e)
        setData((pre: any) => {
            return {...pre, [field]: e}
        });
    }

    const resetInfo = () => {
        setData(undefined)
    }

    const handleSubmit = async () => {
        try {
            await fetch("/api/contact",
                {
                    method: "POST",
                    body: JSON.stringify(data)
                }
            )
        } catch (error) {
            console.log(error)
        }
        resetInfo()
    }

    return <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
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
                    color={"#FFF"}>{"Formulaire pour les partenaires"}
                </Typography>
                <Typography
                    variant={"body1"}
                    color={"#FFF"}>
                    {"Nous serons heureux de vous répondre"}
                </Typography>
            </Box>
            <Card
                component={"form"}
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: 2,
                    p: 3,
                    width: {xl: 800, md: 600, sm: 400, xs: 300},
                }}>
                <CardContent
                    sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "column",
                        gap: 2,
                        width: '100%'
                    }}>
                    <Typography
                        variant={"h5"}>
                        {"Informations Personnelles"}
                    </Typography>
                    <TextField
                        variant={"outlined"}
                        sx={{width: '100%'}}
                        label="Nom"
                        name="name"
                        onChange={handleChange}
                        value={data?.name}
                        required
                    />
                    <TextField
                        variant={"outlined"}
                        sx={{width: '100%'}}
                        label="Prenom"
                        name="firstName"
                        onChange={handleChange}
                        value={data?.firstName}
                        required
                    />
                    <DatePicker
                        label="Date de naissance"
                        name="birthday"
                        value={data?.birthday}
                        onChange={(e: any) => {
                            handleChangeDate(e, "birthday")
                        }}
                        sx={{width: '100%'}}
                    />
                    <TextField
                        variant={"outlined"}
                        sx={{width: '100%'}}
                        label="Date de naissance"
                        name="nationality"
                        onChange={handleChange}
                        value={data?.nationality}
                        required
                    />
                    <br/>
                    <Typography
                        variant={"h5"}>
                        {"Coordonnées"}
                    </Typography>
                    <TextField
                        variant={"outlined"}
                        sx={{width: '100%'}}
                        label="Adresse"
                        name="adresse"
                        onChange={handleChange}
                        value={data?.adresse}
                        required
                    />
                    <TextField
                        variant={"outlined"}
                        sx={{width: '100%'}}
                        label="Numéro de téléphone"
                        name="phoneNumber"
                        onChange={handleChange}
                        value={data?.phoneNumber}
                        required
                    />
                    <TextField
                        variant={"outlined"}
                        sx={{width: '100%'}}
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        value={data?.email}
                        required
                    />
                    <br/>
                    <Typography
                        variant={"h5"}>
                        {"Informations sur l’Organisation"}
                    </Typography>
                    <TextField
                        variant={"outlined"}
                        sx={{width: '100%'}}
                        label="Nom de l’organisation"
                        name="organisation"
                        onChange={handleChange}
                        value={data?.organization}
                        required
                    />
                    <TextField
                        variant={"outlined"}
                        sx={{width: '100%'}}
                        label="Secteur d’activité"
                        name="sector"
                        onChange={handleChange}
                        value={data?.sector}
                        required
                    />
                    <TextField
                        variant={"outlined"}
                        sx={{width: '100%'}}
                        label="Adresse de l’organisation"
                        name="organizationAddress"
                        onChange={handleChange}
                        value={data?.organizationAddress}
                        required
                    />
                    <TextField
                        variant={"outlined"}
                        sx={{width: '100%'}}
                        label="Téléphone de l’organisation"
                        name="organizationPhone"
                        onChange={handleChange}
                        value={data?.organizationPhone}
                        required
                    />
                    <TextField
                        variant={"outlined"}
                        sx={{width: '100%'}}
                        label="Email de l’organisation"
                        name="organizationEmail"
                        type="email"
                        onChange={handleChange}
                        value={data?.organizationEmail}
                        required
                    />
                    <br/>
                    <Typography
                        variant={"h5"}>
                        {"Détails du Partenariat"}
                    </Typography>
                    <TextField
                        variant={"outlined"}
                        sx={{width: '100%'}}
                        label="Type de partenariat souhaité"
                        name="partnershipType"
                        onChange={handleChange}
                        value={data?.partnershipType}
                        rows={5}
                        multiline
                        required
                    />
                    <TextField
                        variant={"outlined"}
                        sx={{width: '100%'}}
                        label="Compétences et ressources proposées "
                        name="skillsAndRessouces"
                        onChange={handleChange}
                        value={data?.skillsAndRessources}
                        rows={5}
                        multiline
                        required
                    />
                    <TextField
                        variant={"outlined"}
                        sx={{width: '100%'}}
                        label="Expériences de partenariats antérieures"
                        name="partenershipExperiences"
                        onChange={handleChange}
                        value={data?.partnershipExperiences}
                        rows={5}
                        multiline
                        required
                    />
                    <br/>
                    <Typography
                        variant={"h5"}>
                        {"Motivation"}
                    </Typography>
                    <TextField
                        variant={"outlined"}
                        sx={{width: '100%'}}
                        label="Pourquoi souhaitez-vous établir un partenariat bénévole avec l’association LTDC ?"
                        name="motivation"
                        rows={10}
                        multiline
                        onChange={handleChange}
                        value={data?.motivation}
                        required
                    />
                    <br/>
                    <FormControlLabel
                        control={<Checkbox value={data?.consent} required/>}
                        label="J’accepte que mes informations soient utilisées par l’association LTDC pour traiter ma demande de partenariat"/>
                </CardContent>
                <CardActions sx={{width: '100%'}}>
                    <Button
                        variant="contained"
                        sx={{width: '100%'}}
                        type={"submit"}
                    >
                        {"Envoyer"}
                    </Button>
                </CardActions>
            </Card>
        </ContainerWrapper>
    </Box>
};

export default SponsorShipForm;
