import React from 'react';
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
import {faUtensils} from "@fortawesome/free-solid-svg-icons/faUtensils";
import {faWeight} from "@fortawesome/free-solid-svg-icons/faWeight";
import {faBaby} from "@fortawesome/free-solid-svg-icons/faBaby";
import {faCarrot} from "@fortawesome/free-solid-svg-icons/faCarrot";

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

export interface IconProps{
    icon:string;
}

export const Icon = ({icon}:IconProps) => {

    if(undefined === validIcons[icon]){
        return (<React.Fragment/>);
    }

    return (
        <FontAwesomeIcon icon={validIcons[icon]} size="2x" />);

}