import React, { useEffect } from 'react';

import * as d3 from 'd3';

import {usePersistedState} from "../hooks/persisted-state";

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
        //console.log(position);
    })
    .catch((err) => {
        console.error(err.message);
    });

    const createMap = (geojson) => {

        const border = geojson.features.find((feature)=>{

            return ('aussengrenze' === feature.properties.slug)

        })

        const width = 1000;
        const height = 800;

        const projection = d3.geoMercator()
            .translate([width / 2, height / 2]);

        //projection.angle(181.5)

        const geoPath = d3.geoPath()
            .projection(projection);

        var center = d3.geoCentroid(border);

        projection
            .scale(3000000)
            .center(center)

        document.getElementById(mapId).innerHTML = '';

        var svg = d3.select(`#${mapId}`).append("svg")
            .attr("width", width + 'px')
            .attr("height", height + 'px')
            .attr("style", 'background:red')
        ;

        var g = svg.append("g");


        var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        const addGeoJson = (data) => {


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
                .attr("d", geoPath)
                .on("mouseover", (d) => {

                    if(undefined === d.properties || undefined === d.properties.name){
                        return;
                    }

                    tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);
                    tooltip.html(d.properties.name)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", (d) => {
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                });


        }

        const addPosition = (lat, lng) => {

            const currentPosition = {
                "type": "Feature",
                "properties":{
                    name: "Aktuelle Position",
                    slug: "current-position",
                    zIndex: 100,
                    fill: "black"
                },
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        lng,
                        lat
                    ]
                }
            };

            const found = geojson.features.find((features) => {
                return 'current-position' === features.properties.slug
            });

            if(undefined === found){
                geojson.features.push(currentPosition);
            }
            else{

                found.properties.name = "Aktuelle Position geupdatd";
                found.geometry.coordinates = [
                    lng,
                    lat
                ];
            }

        };

        addPosition(marker.lat, marker.lng);
        addGeoJson(geojson.features)

        function mousemoved() {

            const position = projection.invert(d3.mouse(this))

            addPosition(position[1], position[0]);

            addGeoJson(geojson.features)

        }

        svg.on("mousemove", mousemoved);


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