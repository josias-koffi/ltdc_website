"use client";
import React, {useContext} from "react";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import {Box, Typography} from "@mui/material";
import {ScreenTypeContext} from "@/app/template";
import {PartnerImageInterface} from "@/libs/interfaces/Interfaces";
import ImageBoxPartner from "@/components/sections/partner/components/ImageBoxPartner";

const PartnerSection = () => {
    const partnerImages: PartnerImageInterface[] = [
        {
            name: "Les Apprentis D'auteuil",
            url: "https://www.apprentis-auteuil.org",
            sourceName: "Apprentis-auteuil_LOGO.webp",
        },
        {
            name: "Association Guinéenne des étudiants de Tours",
            url: "https://www.facebook.com/assoguinee.tours/?locale=fr_FR",
            sourceName: "Association-Guinéenne-des-étudiants-de-Tours.jpg",
        },
        {
            name: "Humenya",
            url: "https://linktr.ee/humenya.asso",
            sourceName: "Humenya.jpeg",
        },
    ];

    const notPhoneScreen = useContext(ScreenTypeContext);
    return (
        <ContainerWrapper>
            <Typography variant={notPhoneScreen ? "h2" : "h3"} fontWeight={"bold"}>
                Nos partenaires
            </Typography>
            <Typography>
                {"Parce qu’ils partagent nos valeurs et soutiennent notre mission au quotidien, " +
                    "découvrez les partenaires qui rendent possible chaque jour notre engagement solidaire."}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: {xs: "column", sm: "column", md: "row", xl: "row"},
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 5,
                    py: 5,
                }}
            >
                {partnerImages?.map((partner) => (
                    <ImageBoxPartner key={partner?.name} image={partner}/>
                ))}
            </Box>
        </ContainerWrapper>
    );
};

export default PartnerSection;
