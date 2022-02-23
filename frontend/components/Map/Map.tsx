import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import * as d3 from 'd3';

import {Group} from "./Group";
import {ZoomLevel} from "./ZoomLevel";
import {useMap} from "./Context/MapContext";
import {Feature} from "geojson";
import {getTransformFromStorage} from "./getTransformFromStorage";
import {getPositionFromStorage} from "./getPositionFromStorage";
import {MarkerImages} from "./Cartesian/Markers/MarkerImages";
import {Edge} from "strapi-api/entity/edge/edge";
import {Node} from "strapi-api/entity/node/node";
import {angle, borderGeoJson} from "../../constants";
import {Facility} from "strapi-api/entity/facility/facility";
import {Marker} from "strapi-api/entity/marker/marker";

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

interface MapProps{
    fullsize: boolean;
    markers:Marker[];
    facilities: Facility[];
    nodes: Node[],
    edges: Edge[]
}

// @refresh reset
export const Map = (props:MapProps) => {

    const {
        state: {dimension, ref},
        dispatch
    } = useMap();

    const classes = useStyles();

    const border = borderGeoJson;

    const createProjectionAndPath = (width, height) => {

        const margin = 20;

        const projection = d3.geoMercator()
            .angle(angle)
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

        if(!dimension){
            return;
        }

        if(!dimension.width || !dimension.height){
            return;
        }

        createProjectionAndPath(dimension.width,dimension.height);

    }, [
        dimension.width,
        dimension.height
    ]);

    return (
        <div
            className={classes.svgWrap}
        >
            <svg
                ref={ref}
                className={`${props.fullsize ? classes.fullScreenMap : ""}`}
                width={dimension.width}
                height={dimension.height}
            >
                <MarkerImages
                    facilities={props.facilities}
                />
                <Group
                    fullsize={props.fullsize}
                    facilities={props.facilities}
                    markers={props.markers}
                    nodes={props.nodes}
                    edges={props.edges}
                />
                <ZoomLevel />
            </svg>
        </div>
    );

}
