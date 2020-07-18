import React from "react";

import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import SimpleBreadcrumbs from '../components/Breadcrumb'
import AppBar from '../components/AppBar'

import dynamic from 'next/dynamic';
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";

const WayGraphMap = dynamic(() => import('../components/WayGraphMap'), {
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
                <WayGraphMap {...props}/>
            </Grid>
        </div>
    );

}

//<WayMap {...props}/>

export async function getStaticProps({ params, preview = false, previewData }) {

    const response = await fetch('http://127.0.0.1:3000/way/')
    let json = await response.json();

    console.log()
    console.log(json.nodes)


    return {
        props: {
            edges: json.edges,
            nodes: json.nodes,
            polygons: [],
            navigation: []
        },
    }
}

export default Index