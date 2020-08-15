import React, { useEffect } from 'react';

import * as d3 from 'd3';

import {usePersistedState} from "../hooks/persisted-state";

export default function ZooMap() {

    const mapId = 'zoo-map';

    const [marker, setMarker] = usePersistedState('marker', {
        lat: 51.23943863918227,
        lng: 7.111485600471497
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

    useEffect(() => {
        const width = 800;
        const height = 700;

        const bound = {
            south: 51.236776961813064,
            west: 7.105611562728882,
            north: 51.24177020918754,
            east: 7.115809321403503
        };

        /*
        const centerLat = (bound.south + bound.north) / 2;
        const centerLng = (bound.west + bound.east) / 2;
         */

        const centerLat = center.lat;
        const centerLng = center.lng

        const projection = d3.geoMercator()
            .scale(5000000)
            .rotate([0, 0, 0])
            .center([centerLng, centerLat])
            .translate([width / 2, height / 2]);

        //projection.angle(90)

        const geoPath = d3.geoPath()
            .projection(projection);

        document.getElementById(mapId).innerHTML = '';

        var svg = d3.select(`#${mapId}`).append("svg")
            .attr("width", width + 'px')
            .attr("height", height + 'px')
        ;

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

            let lng = marker.lng;
            let lat = marker.lat;

            lng = 7.107757;
            lat = 51.238741;
            /*
            let mysteriosLng = 7.110321521759034 - 7.108728
            let mysteriosLat = 51.240815597945485 - 51.24077

            console.log(mysteriosLng, mysteriosLat);

            console.log(lng, lat);


            lng = lng - mysteriosLng
            lat = lat - mysteriosLat

            console.log(lng, lat);
            */
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

            /*
            var currentPositionCollection = {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "geometry": { "type": "Point", "coordinates": [
                                7.108265,
                                51.239674 ] }
                    },

                ]
            };
            */

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

        Promise.all([
            d3.json('/api/geojson/borders'),
            d3.json('/api/geojson/ways'),
            d3.json('/api/geojson/water'),
            d3.json('/api/geojson/buildings')
        ]).then(function(files) {

            addGeoJson(files[0].features, '#B6E2B6')
            addGeoJson(files[2].features, '#AADAFF')
            addGeoJson(files[1].features, '#fff')
            addGeoJson(files[3].features, '#C7C7B4')

            addCurrentPosition();


            var g = svg.selectAll('g');
            var zoom = d3.zoom()
                .scaleExtent([0.5, 8])
                .on('zoom', function() {
                    g.selectAll('path')
                        .attr('transform', d3.event.transform);

            });

            svg.call(zoom);

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
                    background: 'url(/luftaufnahme.png)',
                    backgroundSize: 'cover',
                }}></div>
                <div id={mapId} style={{
                    position:'absolute',
                    top:0,
                    left:0,
                    opacity:0.7,
                    width: '800px',
                    height: '700px'
                }}
                ></div>
            </div>
        );

}