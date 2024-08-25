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
            link: "/projects",
        },
        {
            name: "Événements",
            link: "/events",
        },
        {
            name: "Actualités",
            link: "/actualities",
        },
        {
            name: "Adhésion",
            link: "/get-in-touch/as-beneficiary"
        },
        {
            name: "Partenaires",
            link: "/get-in-touch/as-sponsor"
        },
        {
            name: "Contact",
            link: "/contact"
        },
        {
            name: "Dons",
            link: "https://www.helloasso.com/associations/association-les-travailleurs-du-coeur/collectes/campagne-de-crowdfunding-pour-etablir-un-siege-social",
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
