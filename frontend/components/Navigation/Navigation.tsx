import React from 'react';
import {useRouter} from "next/router";

import {useViewport} from "../viewport/useViewport";
import {NavigationMobile} from "./NavigationMobile";
import {NavigationLarge} from "./NavigationLarge";
import {NavigationListGroupInterface} from "../NavigationList/NavigationListInterfaces";

interface NavigationProps{
    categories:NavigationListGroupInterface[]
}

export const Navigation = (props:NavigationProps) => {

    const {breakpoint } = useViewport();

    const router = useRouter();

    if('small' === breakpoint){
        return <NavigationMobile
            router={router}
            {...props}
        />
    }

    return <NavigationLarge
        router={router}
        {...props}
    />

}
