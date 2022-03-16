import React from 'react';

import {NavigationMobile} from './Mobile/index';
import {NavigationLarge} from './NavigationLarge';
import {NavigationListGroupInterface} from '../NavigationList/NavigationListInterfaces';
import {useTheme} from '@mui/material/styles';
import {useMediaQuery} from '@mui/material';

interface NavigationProps{
    categories:NavigationListGroupInterface[]
}

export const Navigation = ({categories}:NavigationProps) => {

    const theme = useTheme();
    const small = useMediaQuery(theme.breakpoints.down('md'));

    if(small){
        return <NavigationMobile
            categories={categories}
        />
    }

    return <NavigationLarge
        categories={categories}
    />

}
