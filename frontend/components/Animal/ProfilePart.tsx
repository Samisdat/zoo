import React from 'react';
import {Grid, Paper} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {faGlobe} from "@fortawesome/free-solid-svg-icons/faGlobe";
import {faUtensils} from "@fortawesome/free-solid-svg-icons/faUtensils";
import {faCompass} from "@fortawesome/free-solid-svg-icons/faCompass";
import {faRuler} from "@fortawesome/free-solid-svg-icons/faRuler";
import {faWeight} from "@fortawesome/free-solid-svg-icons/faWeight";
import {faBaby} from "@fortawesome/free-solid-svg-icons/faBaby";
import {faCalendar} from "@fortawesome/free-solid-svg-icons/faCalendar";
import {faCarrot} from "@fortawesome/free-solid-svg-icons/faCarrot";


import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHourglassHalf} from "@fortawesome/free-solid-svg-icons/faHourglassHalf";
import {faFish} from "@fortawesome/free-solid-svg-icons/faFish";
import {faEgg} from "@fortawesome/free-solid-svg-icons/faEgg";
import {faGlobeEurope} from "@fortawesome/free-solid-svg-icons/faGlobeEurope";
import {faGlobeAfrica} from "@fortawesome/free-solid-svg-icons/faGlobeAfrica";
import {faGlobeAmericas} from "@fortawesome/free-solid-svg-icons/faGlobeAmericas";
import {faGlobeAsia} from "@fortawesome/free-solid-svg-icons/faGlobeAsia";
import {faRulerHorizontal} from "@fortawesome/free-solid-svg-icons/faRulerHorizontal";
import {faRulerVertical} from "@fortawesome/free-solid-svg-icons/faRulerVertical";
import {faDrumstickBite} from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme: Theme) => {

    return createStyles({
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
        }
    })
});

export interface ProfilePartProps {
    icon:string;
    label:string;
    value:string;
}

const validIcons = {
    'utensils': faUtensils,
    'europe': faGlobeEurope,
    'asia': faGlobeAsia,
    'afrika': faGlobeAfrica,
    'americas': faGlobeAmericas,
    'height':faRulerVertical,
    'length':faRulerHorizontal,
    'weight':faWeight,
    'baby':faBaby,
    'hourglass':faHourglassHalf,
    'egg': faEgg,
    'fish': faFish,
    'meat':faDrumstickBite,
    'carrot': faCarrot,
}

interface ProfileIconProps{
    icon:string;
}

const ProfileIcon = ({icon}:ProfileIconProps) => {

    if(undefined === validIcons[icon]){
        return (<React.Fragment/>);
    }

    return (
        <FontAwesomeIcon icon={validIcons[icon]} size="6x" />);

}

export const ProfilePart = ({
    icon,
    label,
    value
}:ProfilePartProps) => {

    const classes = useStyles();

    return (

        <Grid item xs={12} md={6}>
            <Paper
                className={classes.paper}
                elevation={0}
                square
            >
                <p><ProfileIcon icon={icon}/></p>
                <p>{label}</p>
                <p>{value}</p>

            </Paper>
        </Grid>

    );
}
