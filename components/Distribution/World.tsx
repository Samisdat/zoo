import React, {useEffect, useState} from 'react';

import * as d3 from 'd3';
import {GeoPath} from 'd3';
import {MapTransformInterface,} from "components/Map/Interface";
import {GeoProjection} from "d3-geo";

const mapTransformDefault: MapTransformInterface = {
    k:1,
    x:0,
    y:0
}

export interface GeographicRangeMapStateInterface {
    width: number;
    height: number;
    dimensionUnit: string;
    color: string;
    pathGenerator: GeoPath,
    projection: GeoProjection;
    transform: MapTransformInterface;
}

const MapStateDefault: GeographicRangeMapStateInterface = {
    width: 100,
    height: 100,
    dimensionUnit: '%',
    color: 'red',
    pathGenerator: undefined,
    projection: undefined,
    transform: {
        ...mapTransformDefault
    },
}

export const World = (props) => {

    const svgId = 'geographic-range';
    const worldId = 'geographic-range-world';
    const whereId = "geographic-range-where";

    const [mapState, setMapState] = useState<GeographicRangeMapStateInterface>(MapStateDefault);

    const createMap = () => {

        const width = window.innerWidth - 40;
        //const height = (width/3*2);

        const ratio = 0.5;

        //const width = 800;
        const height = width * ratio;

        const center = d3.geoCentroid(props.world_countries);

        const projection = d3.geoNaturalEarth1()
            .translate([width / 2, height / 2 + 10])
            .scale(150)
            //.center(center)

        const pathGenerator: GeoPath = d3.geoPath().projection(projection)

        d3.select(`#${worldId}`)
            .selectAll("path")
            .data(props.world_countries.features)
            .enter()
            .append("path")
            .attr("fill", (d) => {
                return "red";
            })
            .attr("stroke", (d) => {
                return "red";
            })
            .attr("opacity", (d) => {
                return 1;
            })
            .attr("d", pathGenerator)

        d3.select(`#${whereId}`)
            .selectAll("path")
            .data(props.geojson.features)
            .enter()
            .append("path")
            .attr("fill", (d) => {
                return "green";
            })
            .attr("stroke", (d) => {
                return "green";
            })
            .attr("opacity", (d) => {
                return 1;
            })
            .attr("d", pathGenerator)


        const nextMapState: GeographicRangeMapStateInterface = {
            ...mapState,
            width,
            height,
            dimensionUnit:'px',
            color: 'blue',
            pathGenerator,
            projection: projection,
        };

        setMapState(nextMapState)

    }

    // @TODO add reducer to prevent render twice
    useEffect(() => {

        if (undefined === mapState.pathGenerator) {
            createMap();
        }

    }, );

    return (
        <svg id={svgId} style={{
            width: `${mapState.width}${mapState.dimensionUnit}` ,
            height: `${mapState.height}${mapState.dimensionUnit}`,
            backgroundColor: mapState.color,
            display: 'block',
            margin:20
        }}
        >
            <g id={worldId}></g>
            <g id={whereId}></g>

        </svg>
    );

}
