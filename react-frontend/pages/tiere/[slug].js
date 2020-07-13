import { useRouter } from 'next/router'
import {makeStyles} from "@material-ui/core/styles";
import Navigation from "../../src/Navigation";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "../../src/Link";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";

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

const Tiere = (props) => {
    const router = useRouter()

    const classes = useStyles();

    const animals = props.animals;

    const handleChange = (event) => {
        this.setState({value: event.target.value});
    };

    return (

        <div className={classes.root}>
            <Navigation></Navigation>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <List component="nav">
                        {animals.map((animal) => (
                            <ListItem button component={Link} naked href="/tiere/[slug]" as={`/tiere/${animal.slug}`} >
                                <ListItemText primary={animal.species} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid xs={7}>
                    <h1>{props.active.species}</h1>
                </Grid>
            </Grid>
        </div>
    );
}

export async function getStaticProps({ params, preview = false, previewData }) {

    const res = await fetch('http://127.0.0.1:3000/animal/')
    let json = await res.json();

    const animals = json.map((animal)=>{
        return{
            id: animal.id,
            slug: animal.slug,
            species: animal.species,
            class: animal.class,
            order: animal.order,
            family: animal.family,
            wikipediaDeUrl: ''
        };
    });

    let active = undefined;

    if('index' === params.slug){

        active = animals[0];
    }
    else{

        active = animals.find((animal)=>{

            return (animal.slug === params.slug);

        });

    }

    return {
        props: {
            active,
            animals: animals
        },
    }
}
export async function getStaticPaths() {

    const res = await fetch('http://127.0.0.1:3000/animal/')
    let animals = await res.json();
    
    const paths = animals.map((animal)=>{
        return {
            params: {
                slug: animal.slug
            }
        };
    });

    paths.push({
        params: {
            slug: 'index'
        }
    });

    return {
        paths: paths,
        fallback: false
    };
}

export default Tiere