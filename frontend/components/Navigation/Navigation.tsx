import React from 'react';
import {useViewport} from "../viewport/useViewport";
import NavigationMobile from "./NavigationMobile";
import {useRouter} from "next/router";

export const Navigation = (props) => {

    console.log(props)

    const { width, height, breakpoint } = useViewport();

    const router = useRouter();

    if('extra-small' === breakpoint){
        return <NavigationMobile
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
