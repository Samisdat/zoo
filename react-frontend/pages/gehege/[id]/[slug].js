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

import EnclosureForm from '../../../src/EnclosureForm';

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

const Gehege = (props) => {
    const router = useRouter()
    const { slug } = router.query

    const classes = useStyles();

    const enclosures = props.enclosures;

    console.log('props', props.active.name)


    const handleChange = (event) => {
        this.setState({value: event.target.value});
    };

    return (
        <div className={classes.root}>
            <Navigation></Navigation>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <List component="nav">
                        {enclosures.map((enclosure) => (
                            <ListItem button  component={Link} naked href="/gehege/[id]/[slug]" as={`/gehege/${enclosure.id}/${enclosure.name}`} >
                                <ListItemText primary={enclosure.name} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid xs={7}>
                    <EnclosureForm {...props}></EnclosureForm>
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

export async function getStaticProps({ params, preview = false, previewData }) {

    const res = await fetch('http://127.0.0.1:3000/polygon/enclosure')
    let json = await res.json();

    const enclosures = json.map((enclosure)=>{
        return{
            id: enclosure.id,
            name: enclosure.name
        };
    });

    const active = json.find((enclosure)=>{

        return (enclosure.id === params.id);

    });

    return {
        props: {
            active,
            enclosures
        },
    }
}
export async function getStaticPaths() {

    const res = await fetch('http://127.0.0.1:3000/polygon/enclosure')
    let enclosures = await res.json();
    
    const paths = enclosures.map((enclosure)=>{
        return {
            params: {
                id: enclosure.id,
                slug: enclosure.name
            }
        };
    });

    return {
        paths: paths,
        fallback: false
    };
}

export default Gehege