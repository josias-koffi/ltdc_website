"use client"
import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Checkbox,
    Chip,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography
} from "@mui/material";
import Image from "next/image"
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import {ScreenTypeContext} from "@/app/template";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";

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
    days: string;
    motivation: string;
    experiences: string;
    skills: string;
    consent: boolean
}

interface Props {
    countyFlags: any[]
}

const VolunteerShipForm = ({countyFlags}: Props) => {

    const [data, setData] = useState<DataInterface | undefined>()

    const days = [
        'Lundi',
        'Mardi',
        'Mercredi',
        'Jeudi',
        'Vendredi',
        'Samedi',
        'Dimanche',
    ];

    const notPhoneScreen = useContext(ScreenTypeContext);

    const handleChange = (e: any) => {
        const {value, name} = e.target;
        setData((pre: any) => {
            return {...pre, [name]: value}
        });
    }
    const handleChangeDate = (e: any) => {
        setData((pre: any) => {
            return {...pre, birthday: e}
        });
    }
    const handleChangeSelect = (event: any) => {
        const {
            target: {value},
        } = event;
        setData((pre: any) => {
            return {...pre, days: typeof value === 'string' ? value.split(',') : value}
        });
    };
    const handleNationality = (event: any) => {
        const {
            target: {value},
        } = event;
        setData((pre: any) => {
            return {...pre, nationality: typeof value === 'string' ? value.split(',') : value}
        });
    };
    const resetInfo = () => {
        setData(undefined)
    }

    const handleSubmit = async (e: any) => {
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

    useEffect(() => {
        setData((pre: any) => {
            return {...pre, birthday: dayjs(), consent: false}
        });
    }, [])

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
                alt="Photo dfond violet"
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
                    color={"#FFF"}>
                    {"Formulaire pour devenir bénévole "}
                </Typography>
                <Typography
                    variant={"body1"}
                    color={"#FFF"}>
                    {"Nous serons heureux de vous compter paris nos bénévoles"}
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
                        onChange={handleChangeDate}
                        sx={{width: '100%'}}
                    />
                    <FormControl sx={{width: "100%"}}  required>
                        <InputLabel id="demo-multiple-chip-label">{"Nationalité"}</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            value={data?.nationality ?? []}
                            onChange={handleNationality}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
                            sx={{width: '100%'}}

                        >
                            {countyFlags?.map((county) => (
                                <MenuItem
                                    key={county[0]}
                                    value={county[1]}
                                    sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}
                                >
                                    <img
                                        src={`https://flagcdn.com/${county[0]}.svg`}
                                        width="30"
                                        alt={county[1]}/>
                                    {county[1]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                        {"Disponibilités"}
                    </Typography>
                    <FormControl sx={{width: "100%"}} required>
                        <InputLabel id="demo-multiple-chip-label">{"Jours de disponibilités"}</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={data?.days ?? []}
                            onChange={handleChangeSelect}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip"/>}
                            renderValue={(selected: any) => (
                                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                    {selected.map((value: any) => (
                                        <Chip key={value} label={value}/>
                                    ))}
                                </Box>
                            )}
                            sx={{width: '100%'}}
                        >
                            {days.map((day) => (
                                <MenuItem
                                    key={day}
                                    value={day}
                                >
                                    {day}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br/>
                    <Typography
                        variant={"h5"}>
                        {"Compétences et Expériences"}
                    </Typography>
                    <TextField
                        variant={"outlined"}
                        sx={{width: '100%'}}
                        label="Compétences spécifiques"
                        name="skills"
                        rows={10}
                        multiline
                        onChange={handleChange}
                        value={data?.skills}
                        required
                    />
                    <TextField
                        variant={"outlined"}
                        sx={{width: '100%'}}
                        label="Expériences de bénévolat antérieures"
                        name="experiences"
                        rows={10}
                        multiline
                        onChange={handleChange}
                        value={data?.experiences}
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
                        label="Pourquoi souhaitez-vous devenir bénévole pour l’association LTDC ?"
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
                        label="J’accepte que mes informations soient utilisées par l’association LTDC pour traiter ma demande de bénévolat"/>
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

export default VolunteerShipForm;
