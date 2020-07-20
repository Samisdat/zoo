import React from "react";

import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import SimpleBreadcrumbs from '../components/Breadcrumb'
import AppBar from '../components/AppBar'

import dynamic from 'next/dynamic';
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

const WayEditor = dynamic(() => import('../components/WayEditor'), {
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
                <Grid item xs={12}>
                    <Paper square className={classes.paper}>
                        <SimpleBreadcrumbs></SimpleBreadcrumbs>
                    </Paper>
                </Grid>
                <WayEditor {...props}/>
            </Grid>
        </div>
    );

}

//<WayMap {...props}/>

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

    const response = await fetch('http://127.0.0.1:3000/polygon/way')
    let json = await response.json();

    const polygons = json.map((polygon)=>{

        return{
            id: polygon.id,
            osmId: polygon.osmId,
            name: polygon.name,
            slug: polygon.slug,
            coordinate: polygon.coordinate,
            color: getPolygonColor(polygon.type)
        };
    });



    return {
        props: {
            polygons,
            navigation: []
        },
    }
}

export default Index