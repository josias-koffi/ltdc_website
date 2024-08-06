import React, {useContext, useState} from "react";
import {Box} from "@mui/material";
import ButtonList from "@/components/header/components/ButtonList";
import Image from "next/image";
import {IconMenu2, IconSquareX} from "@tabler/icons-react";
import {FrameSettingContext, ScreenTypeContext} from "@/app/template";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";

const Header = () => {
    const frame = useContext(FrameSettingContext);
    const isNotMobileScreen = useContext(ScreenTypeContext);

    const [expanded, setExpanded] = useState<boolean>(false);

    const handleExpend = () => {
        setExpanded(!expanded);
    };

    return (
        <Box sx={{backgroundColor:"#FFF"}}>
            <ContainerWrapper sxProps={{py:3}}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <Image
                        src="/icons/icon_logo.svg"
                        width={50}
                        height={50}
                        alt="Picture of the author"
                    />
                    {isNotMobileScreen ? null : expanded ? (
                        <IconSquareX onClick={handleExpend}/>
                    ) : (
                        <IconMenu2 onClick={handleExpend}/>
                    )}
                    <ButtonList normalButton={isNotMobileScreen} expanded={expanded}/>
                </Box>
            </ContainerWrapper>
        </Box>


    );
};

export default Header;
