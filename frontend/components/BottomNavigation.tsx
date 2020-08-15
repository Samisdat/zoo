import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import MapIcon from '@material-ui/icons/Map';
import PetsIcon from '@material-ui/icons/Pets';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DirectionsIcon from '@material-ui/icons/Directions';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import WcIcon from '@material-ui/icons/Wc';
import MenuIcon from '@material-ui/icons/Menu';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
});

export default function LabelBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState('map');

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
        <BottomNavigation
            value={value}
            onChange={handleChange}
            className={classes.root}
            showLabels
        >
            <BottomNavigationAction label="Karte" value="map" icon={<MapIcon />} />
            <BottomNavigationAction label="Tiere" value="animals" icon={<PetsIcon />} />
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
            <BottomNavigationAction label="Menu" value="menu" icon={<MenuIcon />} />
        </BottomNavigation>
    );
}