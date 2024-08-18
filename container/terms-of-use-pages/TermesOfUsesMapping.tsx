"use client"
import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material"
import {getItems} from "@/libs/directus";
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import {trierParCle} from "@/libs/ArrayLibs";

const TermesOfUsesMapping = () => {
    const [articles, setArticles] = useState<any[]>([])

    useEffect(() => {
        getItems("terms_of_use").then((result: any) => {
                setArticles(trierParCle(result, "order"))
            }
        )
    }, []);

    const mappedConditions = () => articles?.map(condition => {

        return <div>
            <Typography variant={"h5"} color={"primary"}>{condition?.title}</Typography>
            <div dangerouslySetInnerHTML={{__html: condition?.content}}/>
        </div>
    })

    return (
        <ContainerWrapper containerWidth={"md"}>
            <Typography variant={"h4"} align={"center"} color={"primary"} sx={{pb:5}}>{"MENTIONS LÉGALES"}</Typography>
            {mappedConditions()}
        </ContainerWrapper>
    );
};

export default TermesOfUsesMapping;
