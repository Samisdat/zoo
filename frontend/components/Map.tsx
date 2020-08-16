import React, { useEffect } from 'react';

import * as d3 from 'd3';

import {usePersistedState} from "../hooks/persisted-state";
import {createReadStream} from "fs";

export default function ZooMap() {

    const mapId = 'zoo-map';

    const [marker, setMarker] = usePersistedState('marker', {
        lat: 51.238741,
        lng: 7.107757
    });

    const [center, setCenter] = usePersistedState('center', {
        lat: 51.23925648995369,
        lng: 7.11062378150634421,
    });


    var getPosition = function (options) {
        return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
    }

    getPosition({})
    .then((position) => {
        console.log(position);
    })
    .catch((err) => {
        console.error(err.message);
    });

    const createMap = (jsons) => {

        const borders = jsons[0];
        const ways = jsons[1];
        const water = jsons[2];
        const buildings = jsons[3];

        const width = 600;
        const height = 500;

        const projection = d3.geoMercator()
            .scale(3000000)
            .rotate([0, 0, 0])
            .center([center.lng, center.lat])
            .translate([width / 2, height / 2]);

        // projection.angle(181.5)

        const geoPath = d3.geoPath()
            .projection(projection);

        document.getElementById(mapId).innerHTML = '';

        var svg = d3.select(`#${mapId}`).append("svg")
            .attr("width", width + 'px')
            .attr("height", height + 'px')
            .attr("style", 'background:red')
        ;

        const addGeoJson = (data, fill) => {

            let g = svg.append("g");
            console.log(data)

            g.selectAll("path")
                .data(data)
                .enter()
                .append("path")
                .attr("fill", fill)
                /*.attr( "stroke", "#333")*/
                .attr("d", geoPath);

        }

        const addCurrentPosition = () => {

            let lng = marker.lng;
            let lat = marker.lat;

            var currentPositionCollection = {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "geometry": { "type": "Point", "coordinates": [
                                lng,
                                lat ] }
                    },

                ]
            };

            var rodents = svg.append( "g" );

            rodents.selectAll( "path" )
                .data( currentPositionCollection.features )
                .enter()
                .append( "path" )
                .attr( "fill", "#900" )
                .attr( "stroke", "#999" )
                .attr( "opacity", 0.5 )
                .attr( "d", geoPath )
            ;

        };

        addGeoJson(borders.features, '#B6E2B6')
        addGeoJson(water.features, '#AADAFF')
        addGeoJson(ways.features, '#fff')
        addGeoJson(buildings.features, '#C7C7B4')

        addCurrentPosition();

        var g = svg.selectAll('g');
        var zoom = d3.zoom()
            .scaleExtent([0.5, 8])
            .on('zoom', function() {
                g.selectAll('path')
                    .attr('transform', d3.event.transform);

            });

        svg.call(zoom);

    };

    useEffect(() => {

        Promise.all([
            d3.json('/api/geojson/borders'),
            d3.json('/api/geojson/ways'),
            d3.json('/api/geojson/water'),
            d3.json('/api/geojson/buildings')
        ]).then(function(files) {

            createMap(files);

        }).catch(function(err) {
            // handle error here
        })

    }, []);

        return (
            <div
                style={{
                    position:'static'
                }}
            >
                <div style={{
                    position:'absolute',
                    top:0,
                    left:0,
                    width: '800px',
                    height: '700px',
                    opacity:0,
                    background: 'url(/luftaufnahme.png)',
                    backgroundSize: 'cover',
                }}></div>
                <div id={mapId} style={{
                    position:'absolute',
                    top:0,
                    left:0,
                    opacity:1,
                    width: '800px',
                    height: '700px'
                }}
                ></div>
            </div>
        );

}