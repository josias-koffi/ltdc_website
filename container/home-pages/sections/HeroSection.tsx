"use client";
import React, {useContext} from "react";
import {Box, Button, Grid, Stack, Typography, useTheme,} from "@mui/material";
import {IconChevronRight} from "@tabler/icons-react";
import Image from "next/image";
import {ScreenTypeContext} from "@/app/template";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";

const HeroSection = () => {
    const theme = useTheme();
    const notPhoneScreen = useContext(ScreenTypeContext);
    const ABSOLUT_IMAGE_POSITION = notPhoneScreen ? 2 : -300;
    const TITLE_VARIANTS = notPhoneScreen ? "h1" : "h2";

    return (
        <ContainerWrapper>
            <Stack
                direction="row"
                spacing={0}
                sx={{py: 10}}
            >
                <Image
                    src={"/images/homePage/Ellipse.svg"}
                    alt={"Personnes travaillant ensemble"}
                    width={500}
                    height={500}
                    style={{
                        position: "absolute",
                        top: ABSOLUT_IMAGE_POSITION,
                        left: ABSOLUT_IMAGE_POSITION,
                    }}
                />
                <Grid
                    item
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        flexGrow: 1,
                        gap: 5,
                    }}
                >
                    <Typography variant={TITLE_VARIANTS}>
                        {"Faire une "}
                        <span style={{color: theme?.palette?.primary?.main}}>
            {"différence"}
          </span>
                        {" dans le monde"}
                    </Typography>
                    <Box>
                        <Button
                            variant="contained"
                            sx={{m: 1}}
                            size="large"
                            href={"/"}
                            endIcon={<IconChevronRight/>}
                        >
                            {"Nos activités"}
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{m: 1}}
                            size="large"
                            href={"/"}
                            endIcon={<IconChevronRight/>}
                        >
                            {"Faire un don"}
                        </Button>
                    </Box>
                </Grid>
                <Grid
                    item
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {notPhoneScreen ? (
                        <Image
                            src={"/images/homePage/working.svg"}
                            alt={"Personnes travaillant ensemble"}
                            width={600}
                            height={600}
                        />
                    ) : null}
                </Grid>
            </Stack>
        </ContainerWrapper>

    );
};

export default HeroSection;
