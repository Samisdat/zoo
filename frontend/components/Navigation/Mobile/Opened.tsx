import React, {MouseEventHandler} from 'react';

import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import {
    NavigationList,
} from '../../NavigationList/NavigationList';

import {NavigationListGroupInterface} from '../../NavigationList/NavigationListInterfaces';
import {Icon} from '../../Icon/Icon';
import {styled} from '@mui/material/styles';
import {NavigationFab} from './Closed';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = styled(AppBar)({
    position: 'relative'
});

const DialogTitleText = styled('div')(({ theme }) => ({
    marginLeft: theme.spacing(2),
    flex: 1,
}));

interface NavigationMobileOpenedProps{
    categories: NavigationListGroupInterface[];
    open: boolean;
    handleClose: MouseEventHandler;
}

export const NavigationMobileOpened = ({categories, open, handleClose}:NavigationMobileOpenedProps) =>{

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <DialogTitle>
                <Toolbar
                    color="primary"
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <Icon
                            icon={'close'}
                            size={'lg'}
                        />
                    </IconButton>
                    <DialogTitleText>
                        <Typography
                            variant="h6"
                        >
                            Der grüne Zoo
                        </Typography>
                    </DialogTitleText>
                </Toolbar>
            </DialogTitle>

            <NavigationList
                groups={categories}
            />

            <NavigationFab
                onClick={handleClose}
            >
                <Icon
                    icon={'close'}
                    size={'lg'}
                />

            </NavigationFab>

        </Dialog>
    );
}
