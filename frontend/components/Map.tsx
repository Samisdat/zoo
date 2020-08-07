import React, { useEffect } from 'react';

import * as d3 from 'd3';

import {usePersistedState} from "../hooks/persisted-state";

export default function ZooMap() {

    const mapId = 'zoo-map';

    const [count, setCount] = usePersistedState('count', 0);


    useEffect(() => {
        const width = 400;
        const height = 580;

        const bound = {
            south: 51.236776961813064,
            west: 7.105611562728882,
            north: 51.24177020918754,
            east: 7.115809321403503
        };

        const centerLat = (bound.south + bound.north) / 2;
        const centerLng = (bound.west + bound.east) / 2;

        const projection = d3.geoMercator()
            .scale(4000000)
            .rotate([-1 * centerLng, 0])
            .center([0, centerLat])
            .translate([width / 2, height / 2]);

        //projection.angle(90)

        const geoPath = d3.geoPath()
            .projection(projection);

        var svg = d3.select(`#${mapId}`).append("svg")
            .attr("width", width + 'px')
            .attr("height", height + 'px')
            .attr("style", 'border: 10px solid red');

        console.log(svg)

        var circle = svg.append("circle")
                                 .attr("cx", 30)
                                 .attr("cy", 30)
                                 .attr("r", 20);

        const addGeoJson = async (data, fill) => {

            let g = svg.append("g");

            g.selectAll("path")
                .data(data)
                .enter()
                .append("path")
                .attr("fill", fill)
                /*.attr( "stroke", "#333")*/
                .attr("d", geoPath);

        }

        d3.json('/api/geojson/borders').then((data) => {
            addGeoJson(data.features, '#B6E2B6')
        });

        d3.json('/api/geojson/ways').then((data) => {
            addGeoJson(data.features, '#fff')
        });

        d3.json('/api/geojson/water').then((data) => {
            addGeoJson(data.features, '#AADAFF')
        });

        d3.json('/api/geojson/buildings').then((data) => {
            addGeoJson(data.features, '#C7C7B4')
        });

    }, []);

        return (
            <div>
                <p>You clicked {count} times</p>
                <div id={mapId}></div>

            </div>

        );

}