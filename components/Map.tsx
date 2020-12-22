import React, {Fragment, useEffect, useState} from 'react';

import * as d3 from 'd3';

export interface Marker {
    lat: number;
    lng: number;
    isWithin: boolean;
    isGPS:boolean
    text: string;
}

export interface MapStateInterface {
    width: number;
    height: number;
    focus: string;
    marker: Marker;
    transform: { x: number; y: number; k: number };
}

const markerPropertyDefault: Marker = {
    lat: 51.238741,
    lng: 7.107757,
    isWithin: true,
    isGPS: false,
    text: 'Map Marker Text'
};

const MapStateDefault: MapStateInterface = {
    width: undefined,
    height: undefined,
    focus: 'center',
    marker: markerPropertyDefault,
    transform: {
        k:1,
        x:0,
        y:0
    }
}

import createPersistedState from 'use-persisted-state';
import {Sketched} from "./D3/Sketched";
import {Ways} from "./D3/Ways";
import {CurrentPosition} from "./D3/CurrentPosition";
const useMapState = createPersistedState('map');

export const Map = (props) => {

    const svgId = 'main-svg';

    const [mapState, setMapState] = useState<MapStateInterface>(MapStateDefault);

    const [pathGenerator, setPathGenerator] = useState(undefined);

    const setFocus = (focus:string) => {

        setMapState({
            ...mapState,
            focus: focus
        });

    };

    const setDimensions = () => {

        setMapState({
            ...mapState,
            width: window.innerWidth,
            height: window.innerHeight
        });

    }

    // @TODO add reducer to prevent render twice
    useEffect(() => {

        const width = window.innerWidth;
        const height = window.innerHeight;

        if(width !== mapState.width || height !== mapState.height){
            setDimensions();
        }

        var mapSvg = d3.select(`#${svgId}`)
            .attr("width", width + 'px')
            .attr("height", height + 'px')
            .attr("style", 'background:blue')
        ;

        const projection = d3.geoMercator()
            .translate([width / 2, height / 2])
            .angle(180)
        ;

        console.log(d3.geoPath().projection(projection));

        setPathGenerator(d3.geoPath().projection(projection));
        console.log(pathGenerator);

        var center = d3.geoCentroid(props.border);

        projection
            .scale(3000000)
            .center(center)

        window.addEventListener('resize', setDimensions);

    }, [mapState]);

    return (

        <svg id={svgId} style={{
            width: '100%',
            height: '100%'
        }}
        ></svg>


    );

}
