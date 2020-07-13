import {makeStyles} from "@material-ui/core/styles";
import Navigation from "../src/Navigation";
import Grid from "@material-ui/core/Grid";
import React from "react";

import dynamic from 'next/dynamic';

const MapWithNoSSR = dynamic(() => import('../src/map/Map'), {
    ssr: false
});

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

const Index = (props) => {
    const classes = useStyles();

    return (

        <div className={classes.root}>
            <Navigation></Navigation>
            <Grid container spacing={3}>
                <Grid xs={2}></Grid>
                <Grid xs={8}>
                    <h1>Karte</h1>
                    <MapWithNoSSR {...props}/>
                </Grid>
            </Grid>
        </div>
    );
}

export async function getStaticProps({ params, preview = false, previewData }) {

    const responseEnclosure = await fetch('http://127.0.0.1:3000/polygon/enclosure')
    let jsonEnclosure = await responseEnclosure.json();

    const enclosures = jsonEnclosure.map((enclosure)=>{
        return{
            id: enclosure.id,
            name: enclosure.name,
            slug: enclosure.slug,
            coordinate: enclosure.coordinate,
            color: 'lime'

        };
    });

    const responseBuildings = await fetch('http://127.0.0.1:3000/polygon/building')
    let jsonBuilding = await responseBuildings.json();

    const buildings = jsonBuilding.map((building)=>{
        return{
            id: building.id,
            name: building.name,
            slug: building.slug,
            coordinate: building.coordinate,
            color: 'purple'
        };
    });

    const responseBorder = await fetch('http://127.0.0.1:3000/polygon/border')
    let jsonBorder = await responseBorder.json();

    const borders = jsonBorder.map((border)=>{
        return{
            id: border.id,
            name: border.name,
            slug: border.slug,
            coordinate: border.coordinate,
            color: 'red'
        };
    });

    const responsePlayground = await fetch('http://127.0.0.1:3000/polygon/playground')
    let jsonPlayground = await responsePlayground.json();

    const playgrounds = jsonPlayground.map((playground)=>{
        return{
            id: playground.id,
            name: playground.name,
            slug: playground.slug,
            coordinate: playground.coordinate,
            color: 'yellow'
        };
    });

    const responseWater = await fetch('http://127.0.0.1:3000/polygon/water')
    let jsonWater = await responseWater.json();

    const waters = jsonWater.map((water)=>{
        return{
            id: water.id,
            name: water.name,
            slug: water.slug,
            coordinate: water.coordinate,
            color: 'blue'
        };
    });

    return {
        props: {
            enclosures,
            buildings,
            borders,
            playgrounds,
            waters
        },
    }
}

export default Index