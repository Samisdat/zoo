import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {SizeProp} from '@fortawesome/fontawesome-svg-core';
import {IconName, validIcons} from './IconNames';

export interface IconProps{
    size?: SizeProp,
    icon: IconName;
}

export const Icon = ({
    size,
    icon
}:IconProps) => {

    if(undefined === validIcons[icon]){
        return (<React.Fragment/>);
    }

    if(undefined === size){
        size = '2x';
    }

    return (
        <FontAwesomeIcon
            icon={validIcons[icon]}
            size={size}
        />
    );

}