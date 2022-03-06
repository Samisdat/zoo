import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@mui/material/Fab';

import {Logo} from "./Logo";

import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import {
    NavigationList,
} from "../NavigationList/NavigationList";

import {NavigationListGroupInterface} from "../NavigationList/NavigationListInterfaces";
import {Icon} from "../Icon/Icon";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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

export const NavigationMobile = (props) =>{

    const navigationCategories = props.categories as NavigationListGroupInterface[];

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
        <Dialog
            fullScreen
            open={/*true*/open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
                <AppBar className={classes.appBar}>
                    <Toolbar
                        color="primary"
                    >
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <Icon
                                icon={'close'}
                                size={'lg'}
                            />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Der grüne Zoo
                        </Typography>
                    </Toolbar>
                </AppBar>

            <NavigationList
                groups={navigationCategories}
            />

            <Fab
                color="primary"
                className={classes.fab}
                onClick={handleClose}
                style={{
                    zIndex:5
                }}
            >
                <Icon
                    icon={'close'}
                    size={'lg'}
                />

            </Fab>

        </Dialog>
        <Logo />
        </React.Fragment>
    );
}
