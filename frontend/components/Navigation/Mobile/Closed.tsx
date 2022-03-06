import React, {MouseEventHandler} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Fab from '@mui/material/Fab';
import {Logo} from "../Logo";
import {Icon} from "../../Icon/Icon";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginLeft: theme.spacing(2),
        },
        fab:{
            position: 'fixed',
            bottom: theme.spacing(2),
            left: theme.spacing(2),
            /*backgroundColor: '#00a800',*/
            color: '#fff',
            zIndex:10,
        },
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
        list: {
            width: 250,
        },
        fullList: {
            width: 'auto',
        },
        subheader: {
            backgroundColor: theme.palette.background.paper,
        },
    })
);

interface NavigationMobileClosed{
    handleClickOpen: MouseEventHandler
}

export const NavigationMobileClosed = ({handleClickOpen}:NavigationMobileClosed) =>{

    const classes = useStyles();

    return (
        <React.Fragment>
            <Fab
                color="primary"
                className={classes.fab}
                onClick={handleClickOpen}
            >
                <Icon
                    icon={'menu'}
                    size={'lg'}
                />
            </Fab>
            <Logo />
        </React.Fragment>
    );
}
