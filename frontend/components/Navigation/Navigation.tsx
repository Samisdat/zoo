import React from 'react';
import {useViewport} from "../viewport/useViewport";
import NavigationMobile from "./NavigationMobile";
import {useRouter} from "next/router";
import {NavigationMedium} from "./NavigationMedium";
import {NavigationLarge} from "./NavigationLarge";

export const Navigation = (props) => {

    const { width, height, breakpoint } = useViewport();

    const router = useRouter();

    if('extra-small' === breakpoint){
        return <NavigationMobile
            router={router}
            {...props}
        />
    }

    if('small' === breakpoint){
        return <NavigationMobile
            router={router}
            {...props}
        />
    }

    if('medium' === breakpoint){
        return <NavigationLarge
            router={router}
            {...props}
        />
    }

    if('large' === breakpoint){
        return <NavigationLarge
            router={router}
            {...props}
        />
    }

    if('medium' === breakpoint){
        return <NavigationMedium
            router={router}
            {...props}
        />
    }

    return (
        <React.Fragment>
            Foo {width} {height} {breakpoint}
        </React.Fragment>
    );
}
