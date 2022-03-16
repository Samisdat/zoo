import React, {MouseEventHandler} from 'react';
import {styled} from '@mui/material/styles';
import Fab from '@mui/material/Fab';

import {Logo} from '../Logo';
import {Icon} from '../../Icon/Icon';

export const NavigationFab = styled(Fab)(({ theme }) => ({
    position: 'fixed',
    zIndex:theme.zIndex.appBar,
    bottom: theme.spacing(2),
    left: theme.spacing(2),

    [theme.breakpoints.up('sm')]: {
        left: theme.spacing(3),
    },

}));

interface NavigationMobileClosed{
    handleClickOpen: MouseEventHandler
}

export const NavigationMobileClosed = ({handleClickOpen}:NavigationMobileClosed) =>{

    return (
        <React.Fragment>
            <NavigationFab
                color='primary'
                onClick={handleClickOpen}
            >
                <Icon
                    icon={'menu'}
                    size={'lg'}
                />
            </NavigationFab>
            <Logo />
        </React.Fragment>
    );
}
