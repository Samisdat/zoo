import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import * as d3 from 'd3';

import {Group} from "./Group";
import {ZoomLevel} from "./ZoomLevel";
import {MapElement} from "../../strapi-api/entity/map-element/map-element";
import {useViewport} from "../viewport/useViewport";
import {useMap} from "./Context/MapContext";
import {Feature} from "geojson";
import {getTransformFromStorage} from "./getTransformFromStorage";
import {getMarkerFromStorage} from "./getMarkerFromStorage";

const useStyles = makeStyles({
    fullScreenMap: {
        position: 'absolute',
        top: 0,
        left:0,
    }
});

interface MapRootInterface{
    fullsize: boolean;
    mapElements: MapElement[];
}

export const MapRoot = (props:MapRootInterface) => {

    const { width, height } = useViewport();

    const { dispatch } = useMap()

    const classes = useStyles();

    const svgId = 'main-svg';

    const border = props.mapElements.find((mapElement:MapElement) => {

        if('border' === mapElement.properties?.type){
            return true;
        }

        return false;

    });

    const createMap = (width, height) => {

        const margin = 20;
        const projection = d3.geoMercator()
            .angle(180)
            .scale(1)
            .fitExtent(
                [[margin, margin],
                [width - margin, height - margin]],
                border as Feature
            )
        ;

        const pathGenerator = d3.geoPath().projection(projection)

        dispatch({
            type: 'SET_PATH_AND_PROJECTION',
            path: pathGenerator,
            projection: projection,
        });

    }

    useEffect(() => {

        if(!width || ! height){
            return;
        }

        createMap(width, height);

    }, [width,height]);

    useEffect(() => {

        const position = getMarkerFromStorage();

        dispatch({
            type: 'SET_POSITION',
            position
        });

    }, []);

    useEffect(()=>{

        const transform = getTransformFromStorage();

        dispatch({
            type: 'SET_TRANSFORM',
            transform
        });

    },[]);

    return (
        <svg
            id={svgId}
            className={`${props.fullsize ? classes.fullScreenMap : ""}`}
            width={width}
            height={height}
        >
            <Group
                fullsize={props.fullsize}
                mapElements={props.mapElements}
            />
            <ZoomLevel />
        </svg>
    );

}
