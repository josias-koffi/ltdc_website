"use client"
import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material"
import ContainerWrapper from "@/components/wrapper/ContainerWrapper";
import {trierParCle} from "@/libs/ArrayLibs";

const TermesOfUsesMapping = () => {
    const [articles, setArticles] = useState<any[]>([])
    const getTerms = async () => {
        const res = await fetch("/api/terms_of_use/", {method: "GET"})
        const res2 = await res.json()
        setArticles(trierParCle(res2, "order"))
    }

    useEffect(() => {
        getTerms()
    }, []);

    const mappedConditions = () => articles?.map((condition: any) => {

        return <div key={condition?.id}>
            <Typography variant={"h5"} color={"primary"}>{condition?.title}</Typography>
            <div dangerouslySetInnerHTML={{__html: condition?.content}}/>
        </div>
    })

    return (
        <ContainerWrapper containerWidth={"md"}>
            <Typography variant={"h4"} align={"center"} color={"primary"} sx={{pb: 5}}>{"MENTIONS LÉGALES"}</Typography>
            {mappedConditions()}
        </ContainerWrapper>
    );
};

export default TermesOfUsesMapping;
