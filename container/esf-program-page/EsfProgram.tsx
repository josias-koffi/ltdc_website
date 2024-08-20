"use client"
import React, {useEffect, useState} from 'react';
import {getItems} from "@/libs/directus";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import {Typography} from "@mui/material"

const EsfProgram = () => {
    const [program, setProgram] = useState<any>()
    useEffect(() => {
        getItems("esf_program").then((result: any) => {
                console.log(result)
                setProgram(result)
            }
        )
    }, []);

    return (
        <ContainerWrapper containerWidth={"md"}>
            <Typography variant={"h4"} align={"center"} color={"primary"} sx={{pb: 5}}>{"ASSOCIATION LTDC STORY"}</Typography>
            <div dangerouslySetInnerHTML={{__html: program?.content}}/>
        </ContainerWrapper>
    );
};

export default EsfProgram;
