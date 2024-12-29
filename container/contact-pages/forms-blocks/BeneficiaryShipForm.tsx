"use client";
import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import Image from "next/image";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import { ScreenTypeContext } from "@/app/template";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import mailHandler from "@/services/email/EmailService";
import { transformDayjsFields } from "@/libs/dateutils";
import dayjs from "dayjs";
import {
  BeneficiaryShipFormInterface,
  EmailSubjectEnum,
} from "@/libs/interfaces/Interfaces";

interface Props {
  countyFlags: any[] | undefined;
}

const defaultData: BeneficiaryShipFormInterface = {
  beneficiarySpecificField: "",
  name: "",
  firstName: "",
  phoneNumber: "",
  email: "",
  birthday: dayjs("2000-01-01"),
  nationality: [""],
  adress: "",
  statut: "",
  dateArrived: dayjs().subtract(1, "year"),
  object: "",
  consent: false,
  gender: "femme",
  familySituation: "célibataire",
  oqtf: "non",
  oqtfReceptionDate: dayjs().subtract(1, "year"),
  residentPermitPending: "non",
  residentPermitRequestDate: dayjs().subtract(1, "year"),
  actualStatut: "",
  working: "oui",
  workTitle: "",
  cddOrInterim: "oui",
  workProof: "oui",
  degree: "",
  formationInProgress: "non",
  formationPrecision: "",
  stablePlace: "oui",
  helpForSearchPlace: "oui",
  familyInFrance: "oui",
  otherFamilySituation: "",
  familyLink: "",
  moreInfo: "",
};

const BeneficiaryShipForm = ({ countyFlags }: Props) => {
  const [data, setData] = useState<BeneficiaryShipFormInterface>(defaultData);

  const notPhoneScreen = useContext(ScreenTypeContext);

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

  const handleChangeDate = (
    e: any,
    field:
      | "birthday"
      | "dateArrived"
      | "oqtfReceptionDate"
      | "residentPermitRequestDate",
  ) => {
    setData((pre: any) => {
      return { ...pre, [field]: e };
    });
  };

  const handleNationality = (event: any) => {
    const {
      target: { value },
    } = event;
    setData((pre: any) => {
      return {
        ...pre,
        nationality: typeof value === "string" ? value.split(",") : value,
      };
    });
  };

  const resetInfo = () => {
    setData(defaultData);
  };

  const handleSubmit = async () => {
    try {
      const temp = transformDayjsFields(data);
      await mailHandler(temp, EmailSubjectEnum.Demande_de_beneficiaire);
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
            {"Formulaire pour devenir bénéficiaire"}
          </Typography>
          <br />
          <Typography
            sx={{ whiteSpace: "pre-wrap" }}
            variant={"body1"}
            color={"#FFF"}
          >
            {"Un souci avec vos papiers, votre statut professionnel ou votre logement ? \n" +
              "N'hésitez pas à remplir ce formulaire " +
              "de contact pour que nous examinions votre situation."}
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
            <Typography variant={"h5"}>
              {"Informations Personnelles"}
            </Typography>
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
              label="Prénom(s)"
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
                handleChangeDate(e, "birthday");
              }}
              sx={{ width: "100%" }}
            />
            <FormControl sx={{ width: "100%" }} required>
              <InputLabel id="demo-multiple-chip-label">
                {"Nationalité"}
              </InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                value={data?.nationality}
                onChange={handleNationality}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                sx={{ width: "100%" }}
              >
                {countyFlags?.map((county) => (
                  <MenuItem
                    key={county[0]}
                    value={county[1]}
                    sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                  >
                    <img
                      src={`https://flagcdn.com/${county[0]}.svg`}
                      width="30"
                      alt={county[1]}
                    />
                    {county[1]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Genre</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="gender"
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  gap: 1,
                  flexWrap: "wrap",
                }}
                value={data?.gender}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="femme"
                  control={<Radio />}
                  label="Femme"
                />
                <FormControlLabel
                  value="homme"
                  control={<Radio />}
                  label="Homme"
                />
                <FormControlLabel
                  value="autre"
                  control={<Radio />}
                  label="Autre"
                />
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Situation familiale
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="célibataire"
                name="familySituation"
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  gap: 1,
                  flexWrap: "wrap",
                }}
                value={data?.familySituation}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="célibataire"
                  control={<Radio />}
                  label="Célibataire"
                />
                <FormControlLabel
                  value="marié(e)"
                  control={<Radio />}
                  label="Marié(e)"
                />
                <FormControlLabel
                  value="autre"
                  control={<Radio />}
                  label="Autre"
                />
                <TextField
                  variant={"outlined"}
                  sx={{ width: 200 }}
                  label="Préciser"
                  name="otherFamilySituation"
                  type="string"
                  onChange={handleChange}
                  value={data?.otherFamilySituation}
                  disabled={data?.familySituation !== "autre"}
                />
              </RadioGroup>
            </FormControl>
            <br />
            <Typography variant={"h5"}>{"Coordonnées"}</Typography>
            <TextField
              variant={"outlined"}
              sx={{ width: "100%" }}
              label="Adresse"
              name="adress"
              type="string"
              onChange={handleChange}
              value={data?.adress}
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
              type="email"
              onChange={handleChange}
              value={data?.email}
              required
            />
            <br />
            <Typography variant={"h5"}>{"Situation Administrative"}</Typography>
            <DatePicker
              label="Date d'arriver en France"
              name="dateArrived"
              value={data?.dateArrived}
              onChange={(e: any) => {
                handleChangeDate(e, "dateArrived");
              }}
              sx={{ width: "100%" }}
            />
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                OQTF reçue
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="non"
                name="oqtf"
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  gap: 1,
                  flexWrap: "wrap",
                }}
                value={data?.oqtf}
                onChange={handleChange}
              >
                <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                <FormControlLabel value="non" control={<Radio />} label="Nom" />
              </RadioGroup>
            </FormControl>
            <DatePicker
              label="Date de réception de l'OQTF (si concerné)"
              name="oqtfReceptionDate"
              value={data?.oqtfReceptionDate}
              onChange={(e: any) => {
                handleChangeDate(e, "oqtfReceptionDate");
              }}
              sx={{ width: "100%" }}
              disabled={data?.oqtf !== "oui"}
            />
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Demande de titre de séjour en cours
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="non"
                name="residentPermitPending"
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  gap: 1,
                  flexWrap: "wrap",
                }}
                value={data?.residentPermitPending}
                onChange={handleChange}
              >
                <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                <FormControlLabel value="non" control={<Radio />} label="Nom" />
              </RadioGroup>
            </FormControl>
            <DatePicker
              label="Date de la demande"
              name="residentPermitRequestDate"
              value={data?.residentPermitRequestDate}
              onChange={(e: any) => {
                handleChangeDate(e, "residentPermitRequestDate");
              }}
              sx={{ width: "100%" }}
              disabled={data?.residentPermitPending !== "oui"}
            />
            <TextField
              variant={"outlined"}
              sx={{ width: "100%" }}
              label="Statut (Demandeur d’asile, Réfugié, Sans-papiers, etc.) "
              name="statut"
              onChange={handleChange}
              value={data?.actualStatut}
              required
            />
            <br />
            <Typography variant={"h5"}>{"Formation"}</Typography>
            <TextField
              variant={"outlined"}
              sx={{ width: "100%" }}
              label="Niveau d'études"
              name="degree"
              onChange={handleChange}
              value={data?.degree}
              required
            />
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Formation en cours
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="oui"
                name="formationInProgress"
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  gap: 1,
                  flexWrap: "wrap",
                }}
                value={data?.formationInProgress}
                onChange={handleChange}
              >
                <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                <FormControlLabel value="non" control={<Radio />} label="Nom" />
              </RadioGroup>
            </FormControl>
            <TextField
              variant={"outlined"}
              sx={{ width: "100%" }}
              label="Si oui, précisez"
              name="formationPrecision"
              onChange={handleChange}
              value={data?.formationPrecision}
              disabled={data?.formationInProgress != "oui"}
            />
            <br />
            <Typography variant={"h5"}>
              {"Expérience Professionnelle"}
            </Typography>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Avez-vous un emploi actuel ?
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="working"
                name="working"
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  gap: 1,
                  flexWrap: "wrap",
                }}
                value={data?.working}
                onChange={handleChange}
              >
                <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                <FormControlLabel value="non" control={<Radio />} label="Nom" />
              </RadioGroup>
            </FormControl>
            <TextField
              variant={"outlined"}
              sx={{ width: "100%" }}
              label="Si oui, quel est votre poste ?"
              name="workTitle"
              onChange={handleChange}
              value={data?.workTitle}
              disabled={data?.working != "oui"}
            />
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Avez-vous travaillé en intérim ou en CDD ?
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="oui"
                name="cddOrInterim"
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  gap: 1,
                  flexWrap: "wrap",
                }}
                value={data?.cddOrInterim}
                onChange={handleChange}
              >
                <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                <FormControlLabel value="non" control={<Radio />} label="Nom" />
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Pouvez-vous fournir un justificatif (contrat de travail) ?
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="oui"
                name="workProof"
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  gap: 1,
                  flexWrap: "wrap",
                }}
                value={data?.workProof}
                onChange={handleChange}
              >
                <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                <FormControlLabel value="non" control={<Radio />} label="Nom" />
              </RadioGroup>
            </FormControl>
            <br />
            <Typography variant={"h5"}>{"Besoin en logement"}</Typography>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Avez-vous un logement stable ?
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="oui"
                name="stablePlace"
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  gap: 1,
                  flexWrap: "wrap",
                }}
                value={data?.stablePlace}
                onChange={handleChange}
              >
                <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                <FormControlLabel value="non" control={<Radio />} label="Nom" />
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Avez-vous besoin d'assistance pour le logement ?
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="oui"
                name="helpForSearchPlace"
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  gap: 1,
                  flexWrap: "wrap",
                }}
                value={data?.helpForSearchPlace}
                onChange={handleChange}
              >
                <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                <FormControlLabel value="non" control={<Radio />} label="Nom" />
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Avez-vous des membres de la famille avec un titre de séjour en
                France ?
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="oui"
                name="familyInFrance"
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  gap: 1,
                  flexWrap: "wrap",
                }}
                value={data?.familyInFrance}
                onChange={handleChange}
              >
                <FormControlLabel value="oui" control={<Radio />} label="Oui" />
                <FormControlLabel value="non" control={<Radio />} label="Nom" />
              </RadioGroup>
            </FormControl>
            <TextField
              variant={"outlined"}
              sx={{ width: "100%" }}
              label="Si oui, précisez le lien familial et la durée du titre de séjour"
              name="familyLink"
              onChange={handleChange}
              value={data?.familyLink}
              disabled={data?.familyInFrance !== "oui"}
            />
            <br />
            <Typography variant={"h5"}>
              {"Autres informations utiles ?"}
            </Typography>
            <TextField
              variant={"outlined"}
              sx={{ width: "100%" }}
              label="Toutes informations complémentaires"
              name="moreInfo"
              rows={5}
              multiline
              onChange={handleChange}
              value={data?.moreInfo}
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
              label="J’accepte que mes informations soient utilisées par
                        l’association LTDC pour traiter mademande"
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

export default BeneficiaryShipForm;
