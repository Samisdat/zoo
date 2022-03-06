import React from 'react';

import {useViewport} from "../viewport/useViewport";
import {NavigationMobile} from "./Mobile/index";
import {NavigationLarge} from "./NavigationLarge";
import {NavigationListGroupInterface} from "../NavigationList/NavigationListInterfaces";

interface NavigationProps{
    categories:NavigationListGroupInterface[]
}

export const Navigation = ({categories}:NavigationProps) => {

    const {breakpoint } = useViewport();

    if('small' === breakpoint){
        return <NavigationMobile
            categories={categories}
        />
    }

    return <NavigationLarge
        categories={categories}
    />

}
