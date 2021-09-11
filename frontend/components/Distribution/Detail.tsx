import React, {useEffect, useState} from 'react';

import * as d3 from 'd3';

import {GeoPath} from "d3";
import {GeoProjection} from "d3-geo";
import {MapTransformInterface} from "../Map/Context/MapContext";
import {MapElement} from "../../strapi-api/entity/map-element/map-element";

const mapTransformDefault = {
    k:1,
    x:0,
    y:0
}

export interface DistributionDetailStateInterface {
    width: number;
    height: number;
    dimensionUnit: string;
    color: string;
    pathGenerator: GeoPath,
    projection: GeoProjection;
    transform: MapTransformInterface;
};

const MapStateDefault: DistributionDetailStateInterface = {
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

/**
 * To be refactored, param has wrong type
 */
export const centerToFeatureCollection = (mapElements:MapElement[]) => {

    const latitudes = [];
    const longitudes = [];

    for(const feature of mapElements){

        if(undefined === feature?.geometry){
            continue;
        }

        if('Polygon' === feature.geometry.type){

            for(const coordinates of feature.geometry.coordinates){

                for(const coordinate of coordinates){


                    latitudes.push(coordinate[1]);
                    longitudes.push(coordinate[0]);
                }

            }

        }
        else if('MultiPolygon' === feature.geometry.type){

            for(const coordinates of feature.geometry.coordinates){

                for(const coordinate of coordinates){

                    for(const coord of coordinate){
                        latitudes.push(coord[1]);
                        longitudes.push(coord[0]);
                    }

                }

            }

        }
        else if('LineString' === feature.geometry.type){

            for(const coordinate of feature.geometry.coordinates){

                latitudes.push(coordinate[1]);
                longitudes.push(coordinate[0]);

            }

        }

        else if('Point' === feature.geometry.type){

            latitudes.push(feature.geometry.coordinates[1]);
            longitudes.push(feature.geometry.coordinates[0]);

        }

    }

    let north = Math.max(...latitudes);

    let south = Math.min(...latitudes);

    let west = Math.max(...longitudes);
    let east = Math.min(...longitudes);

    return {
        "type": "Feature",
        "properties": {
            "name": "Centered"
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [east, north],
                    [west, north],
                    [west, south],
                    [east, south],
                    [east, north],
                ]
            ]
        }
    };

}

export const Detail = (props) => {

    const svgId = 'geographic-range';

    const distributionId = 'geographic-range-distribution'

    const worldId = 'geographic-range-world';
    const whereId = "geographic-range-where";
    const rectId = "geographic-range-react";

    const [mapState, setMapState] = useState<DistributionDetailStateInterface>(MapStateDefault);

    const createDetailMap = () => {

        const width = window.innerWidth;
        const height = 400;

        const projection = d3.geoMercator()
        const path = d3.geoPath().projection(projection);

        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", zoomed);

        const svg = d3.select(`#${svgId}`)
            .attr("viewBox", [0, 0, width, height] as any)
        ;


        const distribution = d3.select(`#${distributionId}`);
        const world = d3.select(`#${worldId}`);
        const where = d3.select(`#${whereId}`);
        const rect = d3.select(`#${rectId}`);

        world
            .attr("fill", "#444")
            .attr("stroke", "black")
            .attr("cursor", "pointer")
            .selectAll("path")
            .data(props.worldCountriesJson.features)
            .join("path")
            .attr("d", path);

        where
            .selectAll("path")
            .data(props.distributionGeoJson.features)
            .enter()
            .append("path")
            .attr("fill", (d) => {
                return "yellow";
            })
            .attr("stroke", (d) => {
                return "yellow";
            })
            .attr("opacity", (d) => {
                return 1;
            })
            .attr("d", path)

        const center = centerToFeatureCollection(props.distributionGeoJson.features);

        rect
            .selectAll("path")
            .exit()
            .data([center])
            .enter()
            .append("path")
            .attr("fill", (d)=>{
                return '#0f0';
            })
            .attr("stroke", (d)=>{
                return '#0f0';
            })
            .attr("opacity", 0.7)
            .attr("d", path as any)

        const [[x0, y0], [x1, y1]] = path.bounds(center as any);

        svg.call(
            zoom.transform as any,
            d3.zoomIdentity
                .translate(width / 2, height / 2)
                .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
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
            createDetailMap();
        }

    });

    return (
        <svg id={svgId} style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `400px` ,
            backgroundColor: mapState.color,
            display: 'block',
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
