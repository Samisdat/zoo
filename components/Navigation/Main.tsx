import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import MapIcon from '@material-ui/icons/Map';
import PetsIcon from '@material-ui/icons/Pets';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';

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
    }
});

export default function NavigationMain(props) {

    const {toogleSearch} = props;
    const {toggleSideMenu} = props;

    const classes = useStyles();
    const [value, setValue] = React.useState('map');

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {

        if('search' === newValue){
            toogleSearch();
        }

        if('menu' === newValue){
            toggleSideMenu();
        }

        setValue(newValue);
    };

    return (
        <BottomNavigation
            value={value}
            onChange={handleChange}
            className={classes.root}
            showLabels
            style={{
                zIndex:2000
            }}
        >
            <BottomNavigationAction href="/" label="Karte" value="map" icon={<MapIcon />} />
            <BottomNavigationAction href="/tiere" label="Tiere" value="tiere" icon={<PetsIcon />} />
            <BottomNavigationAction label="Suche" value="search" icon={<SearchIcon />} />
            <BottomNavigationAction label="Menu" value="menu" icon={<MenuIcon />}/>
        </BottomNavigation>
    );
}