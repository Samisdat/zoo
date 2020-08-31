import React, {useEffect, useState} from 'react';

import * as d3 from 'd3';

import {usePersistedState} from "../hooks/persisted-state";
import {
    getCurrentPositionGeoJson
} from "../helper/getCurrentPosition";

export default function ZooMap(props) {

    const svgId = 'main-svg';
    const mapId = 'main-map';
    const mapElementId = 'main-elements';
    const positionId = 'main-position';

    const [marker, setMarker] = usePersistedState('marker', {
        lat: 51.238741,
        lng: 7.107757
    });

    const [data, setData] = useState([1, 1, 1]);

    const renderSvg = () => {

        const border = props.features.find((feature)=>{

            return ('aussengrenze' === feature.properties.slug)

        })

        let viewportWidth = window.innerWidth;
        let viewportHeight = window.innerHeight;


        const projection = d3.geoMercator()
            .translate([viewportWidth / 2, viewportHeight / 2]);

        const geoPath = d3.geoPath()
            .projection(projection);

        var center = d3.geoCentroid(border);

        projection
            .scale(2000000)
            .center(center)

        var mapSvg = d3.select(`#${svgId}`)
            .attr("width", viewportWidth + 'px')
            .attr("height", viewportHeight + 'px')
            .attr("style", 'background:blue')
        ;

        const mapGroup = mapSvg.select(`#${mapId}`);

        var elementsGroup = mapSvg.select(`#${mapElementId}`);
        elementsGroup.selectAll("path")
            .data(props.features)
            .enter()
            .append("path")
            .attr("fill", (d)=>{
                return d.properties.fill;
            })
            .attr("stroke", (d)=>{
                return d.properties.stroke;
            })
            .attr("d", geoPath)
            .attr('title', (d) => {
                if(undefined === d.properties || undefined === d.properties.name){
                    return;
                }

                return  d.properties.name;
            })


        var positionGroup = mapSvg.select(`#${positionId}`);
        const currentPosition = getCurrentPositionGeoJson('initial', marker.lat, marker.lng);

        let update = positionGroup.selectAll("circle")
            .data(currentPosition)
            .join("circle")

            .attr("transform", function(d) { return "translate(" + geoPath.centroid(d) + ")"; })
            .attr("title", (d)=>{
                return d.properties.slug;
            })
            .attr("fill", (d, i)=>{
                return d.properties.fill;
            })
            .attr("stroke", (d)=>{
                return d.properties.stroke;
            })
            .attr("d", geoPath)
            .attr("r", 5)

        ;

        function onClick() {

            const position = projection.invert(d3.mouse(this))

            setMarker({
                lng: position[0],
                lat: position[1]
            })
            console.log(marker)


        };

        mapSvg.on("click", onClick);

        var zoom = d3.zoom()
            .scaleExtent([0.5, 8])
            .on('zoom', function() {
                mapGroup
                    .attr('transform', d3.event.transform);

            });

        mapSvg.call(zoom);


    };

    useEffect(() => {
        renderSvg();
    });

    return (
        <div>
            <svg id={svgId} style={{
                width: '100%',
                height: '100%',
                background: 'red'
            }}
            >
                <g id={mapId}>
                    <g id={mapElementId}></g>
                    <g id={positionId}></g>
                </g>
            </svg>

        </div>
    );

}