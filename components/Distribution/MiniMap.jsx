import React, {useEffect, useState} from 'react';

import * as d3 from 'd3';

import * as topojson from "topojson-client";
import {centerToFeatureCollection} from "./Detail";

const mapTransformDefault = {
    k:1,
    x:0,
    y:0
}
/*
export interface GeographicRangeMapStateInterface {
    width: number;
    height: number;
    dimensionUnit: string;
    color: string;
    pathGenerator: GeoPath,
    projection: GeoProjection;
    transform: MapTransformInterface;
}
*/
const MapStateDefault = {
    width: 100,
    height: 100,
    dimensionUnit: '%',
    color: 'blue',
    pathGenerator: undefined,
    projection: undefined,
    transform: {
        ...mapTransformDefault
    },
}

export const MiniMap = (props) => {

    const svgId = 'minimap';

    const distributionId = 'minimap-distribution'

    const worldId = 'minimap-world';
    const whereId = "minimap-where";
    const rectId = "minimap-react";

    const width = 190;
    const height = 110;

    const [mapState, setMapState] = useState(MapStateDefault);

    const createMapUsa = () => {


        const projection = d3.geoNaturalEarth1()

        const path = d3.geoPath().projection(projection);

        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", zoomed);

        const svg = d3.select(`#${svgId}`)
            .attr("viewBox", [0, 0, width, height])

        ;


        const distribution = d3.select(`#${distributionId}`);
        const world = d3.select(`#${worldId}`);
        const rect = d3.select(`#${rectId}`);

        world
            .attr("fill", "#444")
            .attr("stroke", "#444")
            .attr("cursor", "pointer")
            .selectAll("path")
            .data(props.world_countries.features)
            .join("path")
            .attr("d", path);

        //let center = centerToFeatureCollection(props.world_countries);

        //console.log(JSON.stringify(center))

        let center = {
            "type": "Feature",
            "properties": {"name": "Afghanistan"},
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-180, 83.64513], [180, 83.64513], [180, -85.609038], [-180, -85.609038], [-180, 83.64513]]]
            }
        };


        const centerRect = centerToFeatureCollection(props.geojson);

        rect
            .selectAll("path")
            .exit()
            .data([centerRect])
            .enter()
            .append("path")
            .attr("fill", (d)=>{
                return '#0f0';
            })
            .attr("stroke", (d)=>{
                return '#0f0';
            })
            .attr("opacity", 0.7)
            .attr("d", path)

        const [[x0, y0], [x1, y1]] = path.bounds(center);

        console.log(x0, y0, x1, y1)

        let scale = Math.min(
            8, 1 / Math.max((x1 - x0) / width, (y1 - y0) / height));

       console.log(scale)
        //scale = 0.85

        svg.call(
            zoom.transform,
            d3.zoomIdentity
                .translate(width / 2, height / 2)
                .scale(scale)
                .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
        );



            function zoomed(event) {


            const {transform} = event;
                distribution.attr("transform", transform);
                distribution.attr("stroke-width", 1 / transform.k);
        }

        const nextMapState = {
            ...mapState,
            width,
            height,
            dimensionUnit:'px',
            color: 'blue',
            pathGenerator:path,
            projection: projection
        };

        setMapState(nextMapState)


    }

    // @TODO add reducer to prevent render twice
    useEffect(() => {

        if (undefined === mapState.pathGenerator) {
            createMapUsa();
        }

    });

    return (
        <svg id={svgId} style={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            width: width,
            height: height,
            backgroundColor:'white',
            border:'1px splid black'
        }}
        >
            <g id={distributionId}>
                <g id={worldId}></g>
                <g id={whereId}></g>
                <g id={rectId}></g>
            </g>
        </svg>
    );

}
