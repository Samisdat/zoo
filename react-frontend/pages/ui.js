import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import SimpleBreadcrumbs from '../components/Breadcrumb'
import AppBar from '../components/AppBar'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function FullWidthGrid(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12}>
                        <AppBar {...props}></AppBar>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paper}>xs=6 sm=3</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paper}>xs=6 sm=3</Paper>
                    </Grid>
                    <Box width="100%"></Box>
                    <Grid item xs={12}>
                        <Paper square className={classes.paper}>
                            <SimpleBreadcrumbs></SimpleBreadcrumbs>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{background:"lime"}}>12</div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                            xs=12 sm=6
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>xs=12 sm=6</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paper}>xs=6 sm=3</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paper}>xs=6 sm=3</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paper}>xs=6 sm=3</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paper}>xs=6 sm=3</Paper>
                    </Grid>
                </Grid>
        </div>
    );
}

export async function getStaticProps({ params, preview = false, previewData }) {

    const res = await fetch('http://127.0.0.1:3000/animal/')
    let json = await res.json();

    const navigation = json.map((animal)=>{
        return{
            slug: animal.slug,
            text: animal.species,
        };
    });

    console.log(navigation)

    return {
        props: {
            navigation: navigation
        },
    }
}
