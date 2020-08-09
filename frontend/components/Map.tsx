import React, { useEffect } from 'react';

import * as d3 from 'd3';

import {usePersistedState} from "../hooks/persisted-state";

export default function ZooMap() {

    const mapId = 'zoo-map';

    const [marker, setMarker] = usePersistedState('marker', {
        lat: 51.23943863918227,
        lng: 7.111485600471497
    });


    useEffect(() => {
        const width = 800;
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

        document.getElementById(mapId).innerHTML = '';

        var svg = d3.select(`#${mapId}`).append("svg")
            .attr("width", width + 'px')
            .attr("height", height + 'px')
        ;

        console.log(svg)

        const addGeoJson = (data, fill) => {

            let g = svg.append("g");

            g.selectAll("path")
                .data(data)
                .enter()
                .append("path")
                .attr("fill", fill)
                /*.attr( "stroke", "#333")*/
                .attr("d", geoPath);

        }

        const addCurrentPosition = () => {

            var currentPositionCollection = {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "geometry": { "type": "Point", "coordinates": [
                                marker.lng,
                                marker.lat ] }
                    }
                ]
            };


            var rodents = svg.append( "g" );

            rodents.selectAll( "path" )
                .data( currentPositionCollection.features )
                .enter()
                .append( "path" )
                .attr( "fill", "#900" )
                .attr( "stroke", "#999" )
                .attr( "d", geoPath )
            ;

        };

        Promise.all([
            d3.json('/api/geojson/borders'),
            d3.json('/api/geojson/ways'),
            d3.json('/api/geojson/water'),
            d3.json('/api/geojson/buildings')
        ]).then(function(files) {

            addGeoJson(files[0].features, '#B6E2B6')
            addGeoJson(files[1].features, '#fff')
            addGeoJson(files[2].features, '#AADAFF')
            addGeoJson(files[3].features, '#C7C7B4')

            addCurrentPosition();

        }).catch(function(err) {
            // handle error here
        })

    }, []);

        return (
            <div id={mapId}></div>
        );

}