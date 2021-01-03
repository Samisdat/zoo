import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Logo} from "./Logo";
import {Fab} from "@material-ui/core";

const logoDimension = 120;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginLeft: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        fab:{
            position: 'fixed',
            bottom: theme.spacing(1),
            left: theme.spacing(1),
        }
    }),
);

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <React.Fragment>
        <Fab className={classes.fab}>
            <MenuIcon/>
        </Fab>
        <Logo />
        </React.Fragment>
    );
}
