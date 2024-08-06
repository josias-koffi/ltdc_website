"use client"
import React from 'react';
import {Container} from "@mui/material"

interface ContainerWrapperInterface {
    children?: React.ReactNode
    sxProps?: any
}

const ContainerWrapper = ({children, sxProps}: ContainerWrapperInterface) => {
    return (
        <Container maxWidth="xl" sx={{py: {xl: 10, md: 10, sm: 5, xs: 5}, ...sxProps}}>
            {children}
        </Container>
    );
};

export default ContainerWrapper;
