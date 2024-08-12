import React, {useContext, useState} from "react";
import {Box} from "@mui/material";
import ButtonList from "@/components/header/components/ButtonList";
import {IconMenu2, IconSquareX} from "@tabler/icons-react";
import {FrameSettingContext, ScreenTypeContext} from "@/app/template";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import ImageWrapper from "@/components/wrapper/ImageWrapper";

const Header = () => {
    const frame = useContext(FrameSettingContext);
    const isNotMobileScreen = useContext(ScreenTypeContext);

    const [expanded, setExpanded] = useState<boolean>(false);

    const handleExpend = () => {
        setExpanded(!expanded);
    };

    return (
        <Box sx={{backgroundColor: "#FFF"}}>
            <ContainerWrapper sxProps={{py: 3}}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center",alignItems:"center", position:"relative"}}>
                        <ImageWrapper src={"/icons/Logo_Association_LTDC_LOGO.svg"} alt={"icon asso"} width={80}
                                      height={70} objectFit={"cover"} />
                        <ImageWrapper src={"/icons/Logo_Association_LTDC_TYPO.svg"} alt={"icon asso"} width={200}
                                      height={50} objectFit={"cover"} objectPosition={"center"}/>
                    </Box>

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
