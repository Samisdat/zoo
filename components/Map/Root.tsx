import React, {useEffect, useState} from 'react';

import * as d3 from 'd3';
import {GeoPath} from 'd3';
import {MapStateInterface, MapTransformInterface, MarkerInterface} from "components/Map/Interface";
import {Group} from "./Group";

const markerDefault: MarkerInterface = {
    lat: 51.238741,
    lng: 7.107757,
    isWithin: true,
    isGPS: false,
    text: 'Map Marker Text'
};

const mapTransformDefault: MapTransformInterface = {
    k:1,
    x:0,
    y:0
}

const MapStateDefault: MapStateInterface = {
    width: 100,
    height: 100,
    dimensionUnit: '%',
    color: 'red',
    marker: {
        ...markerDefault
    },
    pathGenerator: undefined,
    projection: undefined,
    transform: {
        ...mapTransformDefault
    },
}

export const MapRoot = (props) => {

    const svgId = 'main-svg';

    const [mapState, setMapState] = useState<MapStateInterface>(MapStateDefault);

    const setTransform = (transform:MapTransformInterface) => {

        if(
            transform.x === mapState.transform.x &&
            transform.y === mapState.transform.y &&
            transform.k === mapState.transform.k
        ){
            return;
        }

        window.localStorage.setItem('pan-zoom', JSON.stringify(transform));

        setMapState({
            ...mapState,
            transform: transform,
        });

        props.setFocus('none');

    };

    const setDimensions = () => {

        const width = window.innerWidth;
        const height = window.innerHeight;

        if(width === mapState.width && height === mapState.height){
            return;
        }

        setMapState({
            ...mapState,
            width: width,
            height: height
        });

    }

    const getTransformFromStorage = ():MapTransformInterface => {

        const zoomFromStorage = window.localStorage.getItem('pan-zoom');

        const defaultTransform = {
            ...mapTransformDefault
        };

        if(null === zoomFromStorage){
            return defaultTransform;
        }

        let json = undefined;

        try {
            json = JSON.parse(zoomFromStorage);
        } catch (e) {
            return defaultTransform;
        }

        if(undefined === json.x){
            return defaultTransform;
        }

        if(undefined === json.y){
            return defaultTransform;
        }

        if(undefined === json.y){
            return defaultTransform;
        }

        return json as MapTransformInterface;

    }

    const getMarkerFromStorage = (): MarkerInterface => {

        const markerFromStorage = window.localStorage.getItem('current-position');

        const defaultMarker = {
            ...markerDefault
        };

        if(null === markerFromStorage){
            return defaultMarker;
        }

        let json = undefined;

        try {
            json = JSON.parse(markerFromStorage);
        } catch (e) {
            return defaultMarker;
        }

        if(undefined === json.lat){
            return defaultMarker;
        }

        if(undefined === json.lng){
            return defaultMarker;
        }

        return json as MarkerInterface;

    }

    const createMap = () => {

        const width = window.innerWidth;
        const height = window.innerHeight;

        const transform = getTransformFromStorage();
        const marker = getMarkerFromStorage()


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
            pathGenerator,
            projection: projection,
            transform,
            marker,
        };

        setMapState(nextMapState)

    }

    // @TODO add reducer to prevent render twice
    useEffect(() => {

        if (undefined === mapState.pathGenerator) {
            createMap();
        }

    }, [mapState,props.focus]);

    return (
        <svg id={svgId} style={{
                width: `${mapState.width}${mapState.dimensionUnit}` ,
                height: `${mapState.height}${mapState.dimensionUnit}`,
                backgroundColor: mapState.color
            }}
        >
            <Group
                mapState={mapState}
                setTransform={setTransform}
                {...props}
            />
        </svg>
    );

}
