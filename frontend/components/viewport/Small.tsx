import React from 'react';
import {useMediaQuery} from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const Small = ({children}) => {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    if(matches){
        return (<React.Fragment>{children}</React.Fragment>);
    }

    return (null);

}
