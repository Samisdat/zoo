import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {Logo} from "./Logo";
import {Fab, Icon, ListItemIcon} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import {
    NavigationList,
} from "../NavigationList/NavigationList";
import {NavigationListGroupInterface} from "../NavigationList/NavigationListInterfaces";

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
    }),
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function NavigationMobile(props) {

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
                    <MenuIcon/>
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
                            <CloseIcon />
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
                <CloseIcon/>
            </Fab>

            </Dialog>
        <Logo />
        </React.Fragment>
    );
}
