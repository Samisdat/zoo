import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Navigation from "../src/Navigation";
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

function ListItemLink(props) {

    return <ListItem button component="a" {...props} />;
}

export default function ButtonAppBar({ enclosures }) {
    const classes = useStyles();

    console.log('enclosures', enclosures)

    return (
        <div className={classes.root}>
            <Navigation></Navigation>

            <Grid container spacing={3}>
                <Grid item xs={4}>

                    <List component="nav">
                        {enclosures.map((enclosure) => (
                            <ListItemLink href="#simple-list" name={enclosure.name} id={enclosure.id} >
                                <ListItemText primary={enclosure.name} />
                            </ListItemLink>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={8}>
                    <Paper className={classes.paper}>xs=8</Paper>
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


export async function getStaticProps() {

    const res = await fetch('http://127.0.0.1:3000/polygon/enclosure')
    let enclosures = await res.json();

    enclosures = enclosures.map((enclosure)=>{
        return{
            id: enclosure.id,
            name: enclosure.name
        };
    });

    return {
        props:{
            enclosures
        }
    }
}