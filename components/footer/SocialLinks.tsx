import React from 'react';
import {Box, IconButton} from "@mui/material";
import {IconBrandFacebookFilled} from "@tabler/icons-react";

const SocialLinks = () => {
    return (
        <Box sx={{display: "flex", flexDirection: "row", gap: 3, flexWrap: "no-wrap", justifyContent: "space-between",alignItems: "center"}}>
            <IconButton href={"https://facebook.com/"} aria-label="delete">
                <IconBrandFacebookFilled color="white" size={30}/>
            </IconButton>
            <IconButton href={"https://facebook.com/"} aria-label="delete">
                <IconBrandFacebookFilled color="white" size={30}/>
            </IconButton>
            <IconButton href={"https://facebook.com/"} aria-label="delete">
                <IconBrandFacebookFilled color="white" size={30}/>
            </IconButton>
            <IconButton href={"https://facebook.com/"} aria-label="delete">
                <IconBrandFacebookFilled color="white" size={30}/>
            </IconButton>
        </Box>
    );
};

export default SocialLinks;
