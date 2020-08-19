import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import MapIcon from '@material-ui/icons/Map';
import PetsIcon from '@material-ui/icons/Pets';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DirectionsIcon from '@material-ui/icons/Directions';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import WcIcon from '@material-ui/icons/Wc';
import MenuIcon from '@material-ui/icons/Menu';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Link from "../src/Link";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
    root: {
        left:'20px',
        right:'20px',
        bottom:'20px',
        position: 'fixed',
        background:'#fff',
        border: '1px solid black',
        borderRadius: '3px',
        boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)'
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function LabelBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState('map');

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor: Anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: true,
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem button key='about'>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <Link href="/about" color="secondary">
                        <ListItemText primary='about' />
                    </Link>
                </ListItem>
                <ListItem button key='gmap'>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <Link href="/gmap" color="secondary">
                        <ListItemText primary='Google Maps' />
                    </Link>
                </ListItem>
                <ListItem button key='leaflet'>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <Link href="/leaflet" color="secondary">
                        <ListItemText primary='leaflet' />
                    </Link>
                </ListItem>
                <ListItem button key='geojson/list'>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <Link href="/geojson/list" color="secondary">
                        <ListItemText primary='geojson/list' />
                    </Link>
                </ListItem>
                <ListItem button key='geojson/new'>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <Link href="/geojson/new" color="secondary">
                        <ListItemText primary='geojson/new' />
                    </Link>
                </ListItem>
            </List>
            <Divider />
            <br/><br/><br/><br/>
        </div>
    );

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>

            <SwipeableDrawer
                anchor='bottom'
                open={state['bottom']}
                onClose={toggleDrawer('bottom', false)}
                onOpen={toggleDrawer('bottom', true)}
            >
                {list('bottom')}
            </SwipeableDrawer>

            <BottomNavigation
                value={value}
                onChange={handleChange}
                className={classes.root}
                showLabels
            >
                <BottomNavigationAction href="/" label="Karte" value="map" icon={<MapIcon />} />
                <BottomNavigationAction href="/species" label="Tiere" value="animals" icon={<PetsIcon />} />
                <BottomNavigationAction label="Routen" value="direction" icon={<DirectionsWalkIcon />} onClick={handleClick}    />
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>
                        <DirectionsIcon /> Rundweg
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <FastfoodIcon/>Essen
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <WcIcon /> Toiletten
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        Spielplätze
                    </MenuItem>
                </Menu>
                <BottomNavigationAction
                    onClick={toggleDrawer('bottom', true)}
                    label="Menu"
                    value="menu"
                    icon={<MenuIcon />}
                />
            </BottomNavigation>
        </React.Fragment>
    );
}