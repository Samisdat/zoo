import { useRouter } from 'next/router'
import {makeStyles} from "@material-ui/core/styles";
import Navigation from "../../../src/Navigation";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "../../../src/Link";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";

import NewEnclosureForm from '../../../src/NewEnclosureForm';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    fab: {
        margin: theme.spacing(2),
    },
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
    },
}));

const GehegeCreate = (props) => {
    const router = useRouter()
    const { slug } = router.query

    const classes = useStyles();

    const enclosures = props.enclosures;

    return (
        <div className={classes.root}>
            <Navigation></Navigation>
            <Grid container spacing={3}>
                <Grid container xs={3}>a</Grid>
                <Grid xs={7}>
                    <NewEnclosureForm {...props}></NewEnclosureForm>
                </Grid>
            </Grid>

            <Tooltip title="Delete">
                <IconButton aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </Tooltip>

        </div>
    );
}


export default GehegeCreate