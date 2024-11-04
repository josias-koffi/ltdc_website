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
  name: "",
  firstName: "",
  phoneNumber: "",
  email: "",
  birthday: dayjs("2000-01-01"),
  nationality: [""],
  statut: "",
  dateArrived: dayjs().subtract(1, "year"),
  object: "",
  message: "",
  consent: false,
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

  const handleChangeDate = (e: any, field: "birthday" | "dateArrived") => {
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
            <br />
            <Typography variant={"h5"}>{"Coordonnées"}</Typography>
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
            <TextField
              variant={"outlined"}
              sx={{ width: "100%" }}
              label="Statut (Demandeur d’asile, Réfugié, Sans-papiers, etc.) "
              name="statut"
              onChange={handleChange}
              value={data?.statut}
              required
            />
            <DatePicker
              label="Date d'arriver en France"
              name="dateArrived"
              value={data?.dateArrived}
              onChange={(e: any) => {
                handleChangeDate(e, "dateArrived");
              }}
              sx={{ width: "100%" }}
            />
            <br />
            <Typography variant={"h5"}>{"Message"}</Typography>
            <TextField
              variant={"outlined"}
              sx={{ width: "100%" }}
              label="Objet de la demande"
              name="object"
              onChange={handleChange}
              value={data?.object}
              required
            />
            <TextField
              variant={"outlined"}
              sx={{ width: "100%" }}
              label="Message"
              name="message"
              rows={5}
              multiline
              onChange={handleChange}
              value={data?.message}
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
