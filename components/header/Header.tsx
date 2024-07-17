import React, {useState} from 'react';
import {Box} from "@mui/material";
import ButtonList from "@/components/header/components/ButtonList";
import Image from 'next/image';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {IconMenu2, IconSquareLetterX, IconSquareX} from '@tabler/icons-react';


const Header = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const [expanded, setExpanded] = useState<boolean>(false);

    const handleExpend = () => {
        setExpanded(!expanded);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: "center",
            px: 5,
            py: 2,
            flexWrap: 'wrap'
        }}>
            <Image
                src="/icons/icon_logo.svg"
                width={50}
                height={50}
                alt="Picture of the author"
            />
            {matches ? null : expanded ? <IconSquareX onClick={handleExpend}/> :
                <IconMenu2 onClick={handleExpend}/>}
            <ButtonList normalButton={matches} expanded={expanded}/>
        </Box>
    );
};

export default Header;
