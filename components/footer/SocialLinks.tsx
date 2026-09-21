import React from "react";
import {Box, IconButton} from "@mui/material";
import {
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBrandYoutube,
    IconBrandTiktok,
} from "@tabler/icons-react";

const SocialLinks = ({
                         preset = true,
                         linkedin,
                         instagram,
                     }: {
    preset?: boolean;
    linkedin?: string;
    instagram?: string;
}) => {
    return preset ? (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: 3,
                flexWrap: "no-wrap",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <IconButton
                href={"https://www.instagram.com/association_ltdc/"}
                aria-label="instagram"
                target="_blank"
            >
                <IconBrandInstagram color="white" size={30}/>
            </IconButton>
            <IconButton
                href={"https://www.linkedin.com/in/association-ltdc-a58942324/"}
                aria-label="linkedin"
                target="_blank"
            >
                <IconBrandLinkedin color="white" size={30}/>
            </IconButton>
            <IconButton
                href={"https://www.youtube.com/@AssociationLTDC"}
                aria-label="youtube"
                target="_blank"
            >
                <IconBrandYoutube color="white" size={30}/>
            </IconButton>
            <IconButton
                href={"https://www.tiktok.com/@association_ltdc"}
                aria-label="Tiktok"
                target="_blank"
            >
                <IconBrandTiktok color="white" size={30}/>
            </IconButton>
        </Box>
    ) : (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 1,
            }}
        >
            {instagram ? (
                <IconButton
                    href={instagram}
                    aria-label="instagram"
                    target="_blank"
                    sx={{backgroundColor: "var(--ltdc-primary)"}}
                >
                    <IconBrandInstagram color="white" size={20}/>
                </IconButton>
            ) : null}
            {linkedin ? (
                <IconButton
                    href={linkedin}
                    aria-label="linkedin"
                    target="_blank"
                    sx={{backgroundColor: "var(--ltdc-primary)"}}
                >
                    <IconBrandLinkedin color="white" size={20}/>
                </IconButton>
            ) : null}
        </Box>
    );
};

export default SocialLinks;
