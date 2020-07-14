import React from "react";

import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import SimpleBreadcrumbs from '../components/Breadcrumb'
import AppBar from '../components/AppBar'

import dynamic from 'next/dynamic';
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

const MapWithNoSSR = dynamic(() => import('../components/Map'), {
    ssr: false
});

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

const Index = (props) => {
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
                    <h1>Karte</h1>
                    <MapWithNoSSR {...props}/>
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

    const getPolygonColor = (type) => {

        if('enclosure' === type){
            return 'lime';
        }

        if('building' === type){
            return 'purple';
        }

        if('border' === type){
            return 'red';
        }

        if('playground' === type){
            return 'yellow';
        }

        if('water' === type){
            return 'blue';
        }

        if('way' === type){
            return 'black';
        }

    };

    const response = await fetch('http://127.0.0.1:3000/polygon/enclosure,building,border,playground,water,way')
    let json = await response.json();

    const polygons = json.map((polygon)=>{
        return{
            id: polygon.id,
            name: polygon.name,
            slug: polygon.slug,
            coordinate: polygon.coordinate,
            color: getPolygonColor(polygon.type)
        };
    });

    const responseAnimals = await fetch('http://127.0.0.1:3000/animal/')
    let jsonAnimals = await responseAnimals.json();

    const navigation = jsonAnimals.map((animal)=>{
        return{
            slug: animal.slug,
            text: animal.species,
        };
    });

    return {
        props: {
            polygons,
            navigation
        },
    }
}

export default Index