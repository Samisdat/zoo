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

    const toggleDrawer = (open: boolean) => (
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

        setState({ ...state, ['bottom']: open });
    };

    const list = () => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: true,
            })}
            role="presentation"
            onClick={toggleDrawer( false)}
            onKeyDown={toggleDrawer( false)}
        >
            <List>
                <div className="MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-button" tabIndex={0} role="button" aria-disabled="false">
                    <a className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorSecondary"
                       href="/about">
                        <div className="MuiListItemText-root"><span
                            className="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock">about</span>
                        </div>
                    </a><span className="MuiTouchRipple-root"></span>
                </div>

                <div className="MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-button" tabIndex={0} role="button" aria-disabled="false">
                    <a className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorSecondary"
                       href="/gmap">
                        <div className="MuiListItemText-root"><span
                            className="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock">google map</span>
                        </div>
                    </a><span className="MuiTouchRipple-root"></span>
                </div>

                <div className="MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-button" tabIndex={0} role="button" aria-disabled="false">
                    <a className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorSecondary"
                       href="/leaflet">
                        <div className="MuiListItemText-root"><span
                            className="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock">leaflet</span>
                        </div>
                    </a><span className="MuiTouchRipple-root"></span>
                </div>

                <div className="MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-button" tabIndex={0} role="button" aria-disabled="false">
                    <a className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorSecondary"
                       href="/geojson/list">
                        <div className="MuiListItemText-root"><span
                            className="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock">geojson/list</span>
                        </div>
                    </a><span className="MuiTouchRipple-root"></span>
                </div>

                <div className="MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-button" tabIndex={0} role="button" aria-disabled="false">
                    <a className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorSecondary"
                       href="/geojson/new">
                        <div className="MuiListItemText-root"><span
                            className="MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock">geojson/new</span>
                        </div>
                    </a><span className="MuiTouchRipple-root"></span>
                </div>

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
                onClose={toggleDrawer( false)}
                onOpen={toggleDrawer( true)}
            >
                {list()}
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
                    onClick={toggleDrawer( true)}
                    label="Menu"
                    value="menu"
                    icon={<MenuIcon />}
                />
            </BottomNavigation>
        </React.Fragment>
    );
}