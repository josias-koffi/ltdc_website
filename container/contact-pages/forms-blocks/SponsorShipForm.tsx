"use client";
import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import { ScreenTypeContext } from "@/app/template";
import mailHandler from "@/libs/mailsSender";
import { transformDayjsFields } from "@/libs/dateutils";
import { SponsorShipFormInterface } from "@/libs/interfaces/Interfaces";

interface Props {
  countyFlags: any[] | undefined;
}

const defaultData: SponsorShipFormInterface = {
  name: "",
  firstName: "",
  adresse: "",
  phoneNumber: "",
  email: "",
  organization: "",
  sector: "",
  organizationAddress: "",
  organizationPhone: "",
  organizationEmail: "",
  motivation: "",
  partnershipType: "",
  skillsAndRessources: "",
  partnershipExperiences: "",
  consent: false,
};

const SponsorShipForm = (props: Props) => {
  const [data, setData] = useState<SponsorShipFormInterface>(defaultData);

  const notPhoneScreen = useContext(ScreenTypeContext);

  /**
   * Updates the state with the given field and value.
   *
   * @param {any} e - The event object containing the new value.
   * @return {void} This function does not return anything.
   */
  const handleChange = (e: any) => {
    const { value, name } = e.target;
    if (name === "consent") {
      const regexPattern = new RegExp("true");
      setData((pre: any) => {
        return { ...pre, [name]: !regexPattern.test(value) };
      });
      return;
    }
    setData((pre: any) => {
      return { ...pre, [name]: value };
    });
  };

  const resetInfo = () => {
    setData(defaultData);
  };

  const handleSubmit = async () => {
    try {
      const temp = transformDayjsFields(data);
      await mailHandler(temp, "Demande de partenariat");
      setData(defaultData);
    } catch (error) {
      console.log(error);
    }
    resetInfo();
  };

  return (
    <Box
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
          zIndex: 1,
        }}
      >
        <Image
          src={"/images/contactPage/background.png"}
          alt="Photo de Jed Villejo sur Unsplash"
          fill={true}
          style={{ objectFit: "fill", objectPosition: " center" }}
        />
      </Box>
      <ContainerWrapper
        sxProps={{
          position: "relative",
          zIndex: 10,
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Box>
          <Typography variant={notPhoneScreen ? "h3" : "h4"} color={"#FFF"}>
            {"Formulaire pour les partenaires"}
          </Typography>
          <Typography variant={"body1"} color={"#FFF"}>
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
            width: { xl: 800, md: 600, sm: 400, xs: 300 },
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            <Typography variant={"h5"}>{"Informations du contact"}</Typography>
            <TextField
              variant={"outlined"}
              sx={{ width: "100%" }}
              label="Nom"
              name="name"
              onChange={handleChange}
              value={data?.name}
              required
            />
            <TextField
              variant={"outlined"}
              sx={{ width: "100%" }}
              label="Prenom"
              name="firstName"
              onChange={handleChange}
              value={data?.firstName}
              required
            />
            <TextField
              variant={"outlined"}
              sx={{ width: "100%" }}
              label="Adresse"
              name="adresse"
              onChange={handleChange}
              value={data?.adresse}
              required
            />
            <TextField
              variant={"outlined"}
              sx={{ width: "100%" }}
              label="Numéro de téléphone"
              name="phoneNumber"
              type="number"
              onChange={handleChange}
              value={data?.phoneNumber}
              required
            />
            <TextField
              variant={"outlined"}
              sx={{ width: "100%" }}
              label="Email"
              name="email"
              onChange={handleChange}
              value={data?.email}
              required
            />
            <br />
            <Typography variant={"h5"}>
              {"Informations sur l’Organisation"}
            </Typography>
            <TextField
              variant={"outlined"}
              sx={{ width: "100%" }}
              label="Nom de l’organisation"
              name="organization"
              onChange={handleChange}
              value={data?.organization}
              required
            />
            <TextField
              variant={"outlined"}
              sx={{ width: "100%" }}
              label="Secteur d’activité"
              name="sector"
              onChange={handleChange}
              value={data?.sector}
              required
            />
            <TextField
              variant={"outlined"}
              sx={{ width: "100%" }}
              label="Adresse de l’organisation"
              name="organizationAddress"
              onChange={handleChange}
              value={data?.organizationAddress}
              required
            />
            <TextField
              variant={"outlined"}
              sx={{ width: "100%" }}
              label="Téléphone de l’organisation"
              name="organizationPhone"
              onChange={handleChange}
              value={data?.organizationPhone}
              required
            />
            <TextField
              variant={"outlined"}
              sx={{ width: "100%" }}
              label="Email de l’organisation"
              name="organizationEmail"
              type="email"
              onChange={handleChange}
              value={data?.organizationEmail}
              required
            />
            <br />
            <Typography variant={"h5"}>{"Détails du Partenariat"}</Typography>
            <TextField
              variant={"outlined"}
              sx={{ width: "100%" }}
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
              sx={{ width: "100%" }}
              label="Compétences et ressources proposées "
              name="skillsAndRessources"
              onChange={handleChange}
              value={data?.skillsAndRessources}
              rows={5}
              multiline
              required
            />
            <TextField
              variant={"outlined"}
              sx={{ width: "100%" }}
              label="Expériences de partenariats antérieures"
              name="partnershipExperiences"
              onChange={handleChange}
              value={data?.partnershipExperiences}
              rows={5}
              multiline
              required
            />
            <br />
            <Typography variant={"h5"}>{"Motivation"}</Typography>
            <TextField
              variant={"outlined"}
              sx={{ width: "100%" }}
              label="Pourquoi souhaitez-vous établir un partenariat bénévole avec l’association LTDC ?"
              name="motivation"
              rows={5}
              multiline
              onChange={handleChange}
              value={data?.motivation}
              required
            />
            <br />
            <FormControlLabel
              control={
                <Checkbox
                  value={data?.consent}
                  required
                  name="consent"
                  onChange={handleChange}
                />
              }
              label="J’accepte que mes informations soient utilisées par l’association LTDC pour traiter ma demande de partenariat"
            />
          </CardContent>
          <CardActions sx={{ width: "100%" }}>
            <Button variant="contained" sx={{ width: "100%" }} type={"submit"}>
              {"Envoyer"}
            </Button>
          </CardActions>
        </Card>
      </ContainerWrapper>
    </Box>
  );
};

export default SponsorShipForm;
