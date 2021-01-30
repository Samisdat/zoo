import React, {useEffect, useState} from 'react';

import * as d3 from 'd3';
import {MapStateInterface, MapTransformInterface, MarkerInterface} from "components/Map/Interface";
import {Group} from "./Group";
import {Feature} from "geojson";
import {MapSearch} from "./Search";
import {makeStyles} from "@material-ui/core/styles";

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
    marker: {
        ...markerDefault
    },
    pathGenerator: undefined,
    projection: undefined,
    transform: {
        ...mapTransformDefault
    },
}

const useStyles = makeStyles({
    fullScreenMap: {
        position: 'absolute',
        top: 0,
        left:0,
        width: `100%`,
        height: `100%`,
    }
});


export const MapRoot = (props) => {

    const classes = useStyles();

    const svgId = 'main-svg';

    const [mapState, setMapState] = useState<MapStateInterface>(MapStateDefault);

    const border = props.geoJson.features.find((feature:Feature) => {

        if('border' === feature.properties?.type){
            return true;
        }

        return false;

    });

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

        //props.setFocus('none');

    };

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

        const width = props.mapDimension.width;
        const height = props.mapDimension.height;

        const transform = getTransformFromStorage();
        const marker = getMarkerFromStorage()

        const margin = 20;
        const projection = d3.geoMercator()
            .angle(180)
            .scale(1)
            .fitExtent([[margin, margin], [width - margin, height - margin]], border)
        ;

        const pathGenerator = d3.geoPath().projection(projection)

        const nextMapState: MapStateInterface = {
            ...mapState,
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

    }, [mapState, props.focus]);

    return (
        <svg
            id={svgId}
            className={classes.fullScreenMap}
        >
            <Group
                mapState={mapState}
                setTransform={setTransform}
                setTeaser={props.setTeaser}
                setFocus={props.setFocus}
                {...props}
            />
        </svg>
    );

}
