"use client";
import React from 'react';
import {Box, Button, Grid, Stack, Switch, Typography, useTheme, useMediaQuery} from "@mui/material";
import {IconChevronRight} from "@tabler/icons-react";
import Image from "next/image";

const HeroSection = () => {
    const theme = useTheme();
    const media = useMediaQuery(theme.breakpoints.up('sm'));
    const ABSOLUT_IMAGE_POSITION = media ? 2 : -300;
    const TITLE_VARIANTS = media ? "h1" : "h2";
    const PADDING_IN_FUNCTION_OF_SCREEN = media ? 20 : 1;

    return (
        <Stack
            direction="row"
            spacing={5}
            sx={{p: PADDING_IN_FUNCTION_OF_SCREEN}}
        >

            <Image src={"/images/homePage/Ellipse.svg"} alt={"Personnes travaillant ensemble"} width={500}
                   height={500}
                   style={{position: "absolute", top: ABSOLUT_IMAGE_POSITION, left: ABSOLUT_IMAGE_POSITION}}/>
            <Grid item
                  sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      flexWrap: "wrap",
                      flexGrow: 1,
                      gap: 0
                  }}
            >


                <Typography variant={TITLE_VARIANTS}>
                    {"Faire une "}
                    <span style={{color: theme?.palette?.primary?.main}}>{"différence"}</span>
                    {" dans le monde"}
                </Typography>


                <Button variant="contained"
                        sx={{m: 1}} size="large"
                        href={"/"}
                        endIcon={<IconChevronRight/>}
                >
                    {"Nos activités"}
                </Button>
                <Button
                    variant="outlined"
                    sx={{m: 1}} size="large"
                    href={"/"}
                    endIcon={<IconChevronRight/>}
                >
                    {"Faire un don"}
                </Button>
            </Grid>
            <Grid item sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Image src={"/images/homePage/working.svg"} alt={"Personnes travaillant ensemble"} width={600}
                       height={600}/>
            </Grid>
        </Stack>
    );
};

export default HeroSection;
