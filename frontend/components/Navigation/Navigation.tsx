import React from 'react';
import {useViewport} from "../viewport/useViewport";
import NavigationMobile from "./NavigationMobile";
import {useRouter} from "next/router";
import {NavigationMedium} from "./NavigationMedium";

export const Navigation = (props) => {

    const { width, height, breakpoint } = useViewport();

    const router = useRouter();

    return <NavigationMedium
        router={router}
        {...props}
    />


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
