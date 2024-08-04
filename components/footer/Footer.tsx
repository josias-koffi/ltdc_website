import React, {useContext} from "react";
import {Box, Grid, Typography, useTheme} from "@mui/material";
import Image from "next/image";
import footerData from "./footer.json";
import Link from "next/link";
import SocialLinks from "@/components/footer/SocialLinks";
import {FrameSettingContext} from "@/app/template";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";

const Footer = () => {
    const frame = useContext(FrameSettingContext);
    const mapQuickLinks = () => {
        return footerData?.quickLinks?.map((quickLink) => {
            return (
                <Grid key={quickLink.link} item xl={6}>
                    <Link
                        style={{color: "white", textDecoration: "none"}}
                        href={quickLink.link}
                    >
                        {quickLink?.name}
                    </Link>
                </Grid>
            );
        });
    };
    const theme = useTheme();
    return (
        <Box
            sx={{
                backgroundColor: "#2A2A2A",
                color: "white",
                py: 5,
            }}
        >
            <ContainerWrapper>
                <Box sx={{flexGrow: 1}}>
                    <Grid container spacing={4}>
                        <Grid item xl={6} xs={12}>
                            <Image
                                src={footerData?.logoLink}
                                width={50}
                                height={50}
                                alt="Picture of the author"
                            />
                            <Typography variant="h5" component="div">
                                {footerData?.callSentence}
                            </Typography>
                            <Typography variant="body1" component="div" sx={{pt: 2}}>
                                {footerData?.richDescription}
                            </Typography>
                        </Grid>
                        <Grid item xl={6} xs={12}>
                            <Typography variant="h5" component="div">
                                {"Lien rapides"}
                            </Typography>
                            <Grid container spacing={2} sx={{pt: 2}}>
                                {mapQuickLinks()}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Box
                    sx={{
                        pt:5,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        flexWrap: "wrap",
                        gap:2
                    }}
                >
                    <SocialLinks/>
                    <Typography variant="body2" component="div">
                        {"© Tout droits réservés 2024"}
                        <span style={{color: theme?.palette?.primary?.main}}>
            {" LTDC"}
          </span>
                    </Typography>
                </Box>
            </ContainerWrapper>
        </Box>
    );
};

export default Footer;
