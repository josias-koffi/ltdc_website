"use client"
import React from 'react';
import {Container} from "@mui/material"

interface ContainerWrapperInterface {
    children?: React.ReactNode
    sxProps?: any
}

const ContainerWrapper = ({children, sxProps}: ContainerWrapperInterface) => {
    return (
        <Container maxWidth="xl" sx={{py: 1, ...sxProps}}>
            {children}
        </Container>
    );
};

export default ContainerWrapper;
