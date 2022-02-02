import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import * as d3 from 'd3';

import {Group} from "./Group";
import {ZoomLevel} from "./ZoomLevel";
import {MapElement} from "../../strapi-api/entity/map-element/map-element";
import {useMap} from "./Context/MapContext";
import {Feature} from "geojson";
import {getTransformFromStorage} from "./getTransformFromStorage";
import {getMarkerFromStorage} from "./getMarkerFromStorage";
import {MarkerImages} from "./Markers/MarkerImages";
import {Edge} from "../../strapi-api/entity/edge/edge";
import {Node} from "../../strapi-api/entity/node/node";

const useStyles = makeStyles({
    svgWrap:{
        position: 'absolute',
        top: '0px',
        bottom: '0px',
        left: '0px',
        right: '0px',
    },
    fullScreenMap: {
        display: 'block',
        width:'100%',
        height:'100%',
        background:'green'
    }
});

interface MapRootInterface{
    fullsize: boolean;
    mapElements: MapElement[];
    boundingBox:MapElement;
    nodes: Node[],
    edges: Edge[]
}

// @refresh reset
export const MapSvg = (props:MapRootInterface) => {

    const { state, dispatch } = useMap();

    const classes = useStyles();

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

        // @todo one to create and one to resize

        if(!state.dimension.width || !state.dimension.height){
            return;
        }

        createMap(state.dimension.width,state.dimension.height);

    }, [
        state.dimension.width,
        state.dimension.height
    ]);

    useEffect(() => {

        const position = getMarkerFromStorage();

        dispatch({
            type: 'SET_POSITION',
            position
        });

    }, []);

    useEffect(()=>{

        const transform = getTransformFromStorage();

        if(!transform.k){
            transform.k = 1;
        }

        if(!transform.x){
            transform.x = 1;
        }

        if(!transform.y){
            transform.y = 1;
        }

        dispatch({
            type: 'SET_TRANSFORM',
            transform
        });

    },[]);

    return (
        <div
            className={classes.svgWrap}
        >
        <svg
            ref={state.ref}
            className={`${props.fullsize ? classes.fullScreenMap : ""}`}
            width={state.dimension.width}
            height={state.dimension.height}
        >
            <MarkerImages
                mapElements={props.mapElements}
            />
            <Group
                fullsize={props.fullsize}
                mapElements={props.mapElements}
                boundingBox={props.boundingBox}
                nodes={props.nodes}
                edges={props.edges}
            />
            <ZoomLevel />
        </svg>
        </div>
    );

}
