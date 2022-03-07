import React, {MouseEventHandler} from 'react';
import {styled} from '@mui/material/styles';
import Fab from '@mui/material/Fab';

import {Logo} from '../Logo';
import {Icon} from '../../Icon/Icon';

export const NavigationFab = styled(Fab)(({ theme }) => ({
    position: 'fixed',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    zIndex:theme.zIndex.appBar
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
