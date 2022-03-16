import React from 'react';
import {useMediaQuery} from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const Large = ({children}) => {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    if(matches){
        return (<React.Fragment>{children}</React.Fragment>);
    }

    return (null);

}
