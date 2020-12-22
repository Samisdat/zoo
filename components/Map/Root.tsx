import React, {useEffect, useState} from 'react';

import * as d3 from 'd3';
import {GeoPath} from 'd3';
import {MapStateInterface, MapTransformInterface, MarkerInterface} from "components/Map/Interface";
import {Group} from "./Group";

const markerPropertyDefault: MarkerInterface = {
    lat: 51.238741,
    lng: 7.107757,
    isWithin: true,
    isGPS: false,
    text: 'Map Marker Text'
};

const MapStateDefault: MapStateInterface = {
    width: 100,
    height: 100,
    dimensionUnit: '%',
    color: 'blue',
    focus: 'center',
    marker: markerPropertyDefault,
    pathGenerator: undefined,
    transform: {
        k:1,
        x:0,
        y:0
    }
}

export const MapRoot = (props) => {

    const svgId = 'main-svg';

    const [mapState, setMapState] = useState<MapStateInterface>(MapStateDefault);

    const setFocus = (focus:string) => {

        setMapState({
            ...mapState,
            focus: focus
        });

    };

    const setTransform = (transform:MapTransformInterface) => {

        setMapState({
            ...mapState,
            transform: transform
        });

    };

    const setDimensions = () => {

        setMapState({
            ...mapState,
            width: window.innerWidth,
            height: window.innerHeight
        });

    }

    const createMap = () => {

        const width = window.innerWidth;
        const height = window.innerHeight;

        const projection = d3.geoMercator()
            .translate([width / 2, height / 2])
            .angle(180)
        ;

        const pathGenerator: GeoPath = d3.geoPath().projection(projection)

        const center = d3.geoCentroid(props.border);

        projection
            .scale(3000000)
            .center(center)

        window.addEventListener('resize', setDimensions);

        const nextMapState: MapStateInterface = {
            ...mapState,
            width,
            height,
            dimensionUnit:'px',
            color: 'blue',
            pathGenerator
        };

        setMapState(nextMapState)

    }

    // @TODO add reducer to prevent render twice
    useEffect(() => {

        if(undefined === mapState || undefined === mapState.pathGenerator){
            createMap();
        }

    }, [mapState]);

    return (

        <svg id={svgId} style={{
            width: `${mapState.width}${mapState.dimensionUnit}` ,
            height: `${mapState.height}${mapState.dimensionUnit}`,
            backgroundColor: mapState.color
        }}
        >
            <Group mapState={mapState} {...props} />
        </svg>


    );

}
