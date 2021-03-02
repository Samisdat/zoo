import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {Avatar, Box, Fab, ListItemAvatar} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MapIcon from "@material-ui/icons/Map";
import PetsIcon from "@material-ui/icons/Pets";
import SearchIcon from "@material-ui/icons/Search";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import MailIcon from "@material-ui/icons/Mail";
import WcIcon from "@material-ui/icons/Wc";
import ChildFriendlyIcon from "@material-ui/icons/ChildFriendly";
import ExploreIcon from "@material-ui/icons/Explore";
import InfoIcon from "@material-ui/icons/Info";
import CodeIcon from "@material-ui/icons/Code";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import BookIcon from '@material-ui/icons/Book';
import StoreIcon from '@material-ui/icons/Store';
import Settings from "../Navigation/Settings";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {animalUrlPart, blogUrlPart, facilityUrlPart} from "../../constants";
import {Feature} from "geojson";
import {Animal} from "../../pages/api/animals";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        listRoot: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
            position: 'relative',
            overflow: 'auto',
            maxHeight: 300,
        },
        menuButton: {
            marginLeft: theme.spacing(2),
        },
        fab:{
            position: 'fixed',
            bottom: theme.spacing(2),
            left: theme.spacing(2),
            /*backgroundColor: '#00a800',*/
            color: '#fff'
        },
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
        list: {
            width: 250,
        },
        fullList: {
            width: 'auto',
        },
        subheader: {
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
};

export default function SearchDialog(props) {
    const classes = useStyles();

    const options = props.geoJson.features.filter((feature:Feature) => {

        if('facility-box' !== feature.properties?.type){
            return false;
        }


        if('playground' === feature.properties?.facilityType){
            return true;
        }

        if('food' === feature.properties?.facilityType){
            return true;
        }

        if('poi' === feature.properties?.facilityType){
            return true;
        }

        if('enclosure' === feature.properties?.facilityType){
            return true;
        }

        return false;

    });

    let group = options
        .reduce((r, e) => {
            let firstLetter = e.properties.name[0].toLowerCase();

            firstLetter = firstLetter
                .replace('ä', 'a')
                .replace('ü', 'u')
                .replace('ö', 'o')
            ;

            if(undefined === r[firstLetter]) {
                r[firstLetter] = []
            }

            r[firstLetter].push(e);

            return r;

        }, {});


    const ordered = {};
    Object.keys(group).sort().forEach(function(key) {
        ordered[key] = group[key];
    });


    console.log(options)

    const [open, setOpen] = React.useState(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onClick = () => {
        console.log('onClick');
    }

    return (
        <React.Fragment>

            <Fab
                color="secondary"
                className={classes.fab}
                onClick={handleClickOpen}
                style={{left:100}}
            >
                <ExpandMoreIcon/>
            </Fab>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                {/*
                <AppBar
                    className={classes.appBar}
                    position="static"
                >
                    <Toolbar
                        color="primary"
                    >
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Suche
                        </Typography>
                    </Toolbar>
                </AppBar>
                */}
                <List
                    className={classes.listRoot}
                >
                    {Object.entries(ordered)
                        .map(([key, value], i) => {
                            return <React.Fragment>
                                <ListSubheader className={classes.subheader}>{key.toUpperCase()}</ListSubheader>
                                {group[key].map(( animal: Feature ) => {

                                    return(
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={animal.properties.name}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        className={classes.inline}
                                                        color="textPrimary"
                                                    >
                                                        Ali Connors
                                                    </Typography>
                                                    {" — I'll be in your neighborhood doing errands this…"}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>

                                    )}
                                )}
                            </React.Fragment>
                    })}


                </List>
                <Fab
                    color="primary"
                    className={classes.fab}
                    onClick={handleClose}
                    style={{
                        zIndex:5
                    }}
                >
                    <CloseIcon/>
                </Fab>

            </Dialog>
        </React.Fragment>
    );
}
