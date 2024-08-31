"use client";
import React, { useContext, useState } from "react";
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
  Typography,
} from "@mui/material";
import Image from "next/image";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import { ScreenTypeContext } from "@/app/template";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { VolunteerShipFormInterface } from "@/libs/interfaces/mailType";
import mailHandler from "@/libs/mailsSender";
import { transformDayjsFields } from "@/libs/dateutils";
import { useRouter } from "next/navigation";

interface Props {
  countyFlags: any[];
}

const defaultData: VolunteerShipFormInterface = {
  name: "",
  firstName: "",
  birthday: dayjs("2000-01-01"),
  nationality: "",
  adresse: "",
  phoneNumber: "",
  email: "",
  statut: "",
  object: "",
  message: "",
  days: null,
  motivation: "",
  experiences: "",
  skills: "",
  consent: false,
};

/**
 * Component to handle the form for the volunteer ship form
 * @param countyFlags array of flags for the countries
 */
const VolunteerShipForm = ({ countyFlags }: Props) => {
  const router = useRouter();
  const [data, setData] = useState<VolunteerShipFormInterface>(defaultData);

  const days: VolunteerShipFormInterface["days"] = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  const notPhoneScreen = useContext(ScreenTypeContext);

  /**
   * Handles the change of the form fields
   * @param e event of the change
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

  /**
   * Handles the change of the date picker
   * @param e event of the change
   */
  const handleChangeDate = (e: any) => {
    setData((pre: any) => {
      return { ...pre, birthday: e };
    });
  };

  /**
   * Handles the change of the select field
   * @param event event of the change
   */
  const handleChangeSelect = (event: any) => {
    const {
      target: { value },
    } = event;
    setData((pre: any) => {
      return {
        ...pre,
        days: typeof value === "string" ? value.split(",") : value,
      };
    });
  };

  /**
   * Handles the change of the nationality field
   * @param event event of the change
   */
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

  /**
   * Handles the submit of the form
   * @param e event of the submit
   */
  const handleSubmit = async (e: any) => {
    try {
      const temp = transformDayjsFields(data);
      const res = await mailHandler(temp, "Demande de volontariat");
      console.log(res);
      if (res) {
        setData(defaultData);
      }
    } catch (error) {
      console.log(error);
    }
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
          alt="Photo dfond violet"
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
            {"Formulaire pour devenir bénévole "}
          </Typography>
          <Typography variant={"body1"} color={"#FFF"}>
            {"Nous serons heureux de vous compter paris nos bénévoles"}
          </Typography>
        </Box>
        <Card
          component={"form"}
          // onSubmit={handleSubmit}
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
              sx={{ width: "100%" }}
            />
            <FormControl sx={{ width: "100%" }} required>
              <InputLabel id="demo-multiple-chip-label">
                {"Nationalité"}
              </InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                value={data?.nationality ?? []}
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
              type="email"
              onChange={handleChange}
              value={data?.email}
              required
            />
            <br />
            <Typography variant={"h5"}>{"Disponibilités"}</Typography>
            <FormControl sx={{ width: "100%" }} required>
              <InputLabel id="demo-multiple-chip-label">
                {"Jours de disponibilités"}
              </InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={data?.days ?? []}
                onChange={handleChangeSelect}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected: any) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value: any) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                sx={{ width: "100%" }}
              >
                {days.map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <Typography variant={"h5"}>
              {"Compétences et Expériences"}
            </Typography>
            <TextField
              variant={"outlined"}
              sx={{ width: "100%" }}
              label="Compétences spécifiques"
              name="skills"
              rows={5}
              multiline
              onChange={handleChange}
              value={data?.skills}
              required
            />
            <TextField
              variant={"outlined"}
              sx={{ width: "100%" }}
              label="Expériences de bénévolat antérieures"
              name="experiences"
              rows={5}
              multiline
              onChange={handleChange}
              value={data?.experiences}
              required
            />
            <br />
            <Typography variant={"h5"}>{"Motivation"}</Typography>
            <TextField
              variant={"outlined"}
              sx={{ width: "100%" }}
              label="Pourquoi souhaitez-vous devenir bénévole pour l’association LTDC ?"
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
              label="J’accepte que mes informations soient utilisées par l’association LTDC pour traiter ma demande de bénévolat"
            />
          </CardContent>

          <CardActions sx={{ width: "100%" }}>
            <Button
              variant="contained"
              sx={{ width: "100%" }}
              onClick={handleSubmit}
              // type={"submit"}
            >
              {"Envoyer"}
            </Button>
          </CardActions>
        </Card>
      </ContainerWrapper>
    </Box>
  );
};

export default VolunteerShipForm;
