import React from "react";
import {Box, Button, Collapse} from "@mui/material";

interface Props {
    normalButton?: boolean | null;
    expanded?: boolean;
}

interface ButtonListProps {
    name: string;
    link: string;
}

const ButtonList = (props: Props) => {
    const buttonList: ButtonListProps[] = [
        {
            name: "Accueil",
            link: "/"
        },
        {
            name: "A Propos",
            link: "/about",
        },
        {
            name: "Projets",
            link: "/about",
        },
        {
            name: "Événements",
            link: "/about",
        },
        {
            name: "Actualités",
            link: "/about",
        },
        {
            name: "Adhésion",
            link: "/contact"
        },
        {
            name: "Partenaires",
            link: "/contact"
        },
        {
            name: "Contact",
            link: "/contact"
        },
        {
            name: "Dons",
            link: "/",
        },
    ];

    const mapButtons = () => {
        return buttonList?.map((item: ButtonListProps) => {
            return (
                <Button key={item.link} href={item.link}>
                    {item?.name}
                </Button>
            );
        });
    };

    const expendedButton = () => {
        return (
            <Collapse
                sx={{width: "100%"}}
                in={props?.expanded}
                timeout="auto"
                unmountOnExit
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    {mapButtons()}
                </Box>
            </Collapse>
        );
    };

    const normalButton = () => {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {mapButtons()}
            </Box>
        );
    };

    return props?.normalButton ? normalButton() : expendedButton();
};

export default ButtonList;
