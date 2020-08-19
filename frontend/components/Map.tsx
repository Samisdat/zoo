import React, { useEffect } from 'react';

import * as d3 from 'd3';

import {usePersistedState} from "../hooks/persisted-state";

export default function ZooMap() {

    const mapId = 'zoo-map';

    const [marker, setMarker] = usePersistedState('marker', {
        lat: 51.238741,
        lng: 7.107757
    });

    console.log(marker);

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
        //console.log(position);
    })
    .catch((err) => {
        console.error(err.message);
    });

    const createMap = (geojson) => {

        const border = geojson.features.find((feature)=>{

            return ('aussengrenze' === feature.properties.slug)

        })

        console.log(border)
        
        const width = 600;
        const height = 500;

        const projection = d3.geoMercator()
            //.scale(3000000)
            //.rotate([0, 0, 0])
            //.center([center.lng, center.lat])
            .translate([width / 2, height / 2]);

        //projection.angle(181.5)

        const geoPath = d3.geoPath()
            .projection(projection);

        var bounds = d3.geoBounds(border),
            center = d3.geoCentroid(border);

        // Compute the angular distance between bound corners
        var distance = d3.geoDistance(bounds[0], bounds[1]);
        var scale = height / distance / Math.sqrt(2);

        projection
            .scale(3000000)
            .center(center)

        document.getElementById(mapId).innerHTML = '';

        var svg = d3.select(`#${mapId}`).append("svg")
            .attr("width", width + 'px')
            .attr("height", height + 'px')
            .attr("style", 'background:red')
        ;

        const addGeoJson = (data) => {

            let g = svg.append("g");

            g.selectAll("path")
                .data(data)
                .enter()
                .append("path")
                .attr("fill", (d)=>{
                    return d.properties.fill;
                })
                .attr("stroke", (d)=>{
                    return d.properties.stroke;
                })
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

            let g = svg.append("g");

            g.selectAll("path")
                .data(currentPositionCollection.features)
                .enter()
                .append("path")
                .attr("fill", 900)
                /*.attr( "stroke", "#333")*/
                .attr("d", geoPath);
        };

        addGeoJson(geojson.features)

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

        d3.json('/api/geojson/remove-later/geojson')
        .then(function(files) {

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