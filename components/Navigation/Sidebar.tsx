import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MapIcon from '@material-ui/icons/Map';
import SearchIcon from '@material-ui/icons/Search';
import PetsIcon from '@material-ui/icons/Pets';
import MailIcon from '@material-ui/icons/Mail';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import WcIcon from '@material-ui/icons/Wc';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import InfoIcon from '@material-ui/icons/Info';
import CodeIcon from '@material-ui/icons/Code';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ExploreIcon from '@material-ui/icons/Explore';

import Settings from './Settings';
import ListSubheader from "@material-ui/core/ListSubheader";
import BottomNavigation from "@material-ui/core/BottomNavigation";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
}));

const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
};

export default function TemporaryDrawer(props) {

    const classes = useStyles();

    const {toggleSideMenu} = props;

    const onClick = () => {
        toggleSideMenu();
    }

    const clickAway = () => {

        console.log(props.openSideMenu)

    }

    return (

        <SwipeableDrawer
            anchor='right'
            open={props.openSideMenu}
            onClose={toggleSideMenu}
            onOpen={toggleSideMenu}
            style={{
                zIndex:3000
            }}
        >
            <List subheader={<ListSubheader  className={classes.subheader}>Hauptmenü</ListSubheader>} style={{ width:'300px'}}>
                <ListItemLink key='map' href="/" onClick={onClick}>
                    <ListItemIcon><MapIcon /></ListItemIcon>
                    <ListItemText primary='Karte' />
                </ListItemLink>
                <ListItemLink button key='species' href="species"onClick={onClick}>
                    <ListItemIcon><PetsIcon /></ListItemIcon>
                    <ListItemText primary='Tiere' />
                </ListItemLink>
                <ListItem button key='search'onClick={onClick}>
                    <ListItemIcon><SearchIcon /></ListItemIcon>
                    <ListItemText primary='Suche' />
                </ListItem>
            </List>
            <List subheader={<ListSubheader className={classes.subheader}>Wichtige Orte</ListSubheader>}>
                <ListItem button key='food'>
                    <ListItemIcon><FastfoodIcon /></ListItemIcon>
                    <ListItemText primary='Essen' />
                </ListItem>
                <ListItem button key='spielplätze'>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary='Spielplätze' />
                </ListItem>
                <ListItem button key='wc'>
                    <ListItemIcon><WcIcon /></ListItemIcon>
                    <ListItemText primary='Toiletten' />
                </ListItem>
                <ListItem button key='diaper-changing'>
                    <ListItemIcon><ChildFriendlyIcon /></ListItemIcon>
                    <ListItemText primary='Wickelraum' />
                </ListItem>
            </List>
            <List subheader={<ListSubheader className={classes.subheader}>Routen</ListSubheader>}>
                <ListItem button key='route-1'>
                    <ListItemIcon><ExploreIcon /></ListItemIcon>
                    <ListItemText primary='Highlights - 2h' />
                </ListItem>
                <ListItem button key='route-2'>
                    <ListItemIcon><ExploreIcon /></ListItemIcon>
                    <ListItemText primary='Ein Tag im Zoo - 5h' />
                </ListItem>
                <ListItem button key='route-3'>
                    <ListItemIcon><ExploreIcon /></ListItemIcon>
                    <ListItemText primary='Mit Kindern - 3h' />
                </ListItem>
                <ListItem button key='route-4'>
                    <ListItemIcon><ExploreIcon /></ListItemIcon>
                    <ListItemText primary='Senioren - 2h' />
                </ListItem>
            </List>
            <List subheader={<ListSubheader className={classes.subheader}>Diese Seite</ListSubheader>}>
                <ListItem button key='imprint'>
                    <ListItemIcon><InfoIcon /></ListItemIcon>
                    <ListItemText primary='Impressum' />
                </ListItem>
                <ListItem button key='About'>
                    <ListItemIcon><CodeIcon /></ListItemIcon>
                    <ListItemText primary='Über' />
                </ListItem>
                <ListItem button key='Documentation'>
                    <ListItemIcon><MenuBookIcon /></ListItemIcon>
                    <ListItemText primary='Dokumentation' />
                </ListItem>
            </List>
            <Settings></Settings>
        </SwipeableDrawer>
        
    );
}
