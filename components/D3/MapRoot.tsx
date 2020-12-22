import React, {Fragment, useEffect, useState} from 'react';
import {GehegeMap} from "./GehegeMap";

export const MapRoot = (props) => {

    const [dimensions, setDimensions] = useState({
        width: undefined,
        height: undefined
    });

    const handleResize = () => {

        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        });

    }

    useEffect(() => {

        const width = window.innerWidth;
        const height = window.innerHeight;

        if(width === dimensions.width && height === dimensions.height ){
            return;
        }

        setDimensions({
            width: width,
            height: height
        });

        window.addEventListener('resize', handleResize)
    }, [dimensions]);

    return (

        <GehegeMap dimensions={dimensions} {...props}></GehegeMap>

    );

}
