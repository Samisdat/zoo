import {useEffect, useState} from 'react';

import * as d3 from 'd3';

import {usePersistedState} from "../hooks/persisted-state";
import {
    getCurrentPositionGeoJson
} from "../helper/getCurrentPosition";

import MapDrawed from './Map-Drawed'

export default function ZooMap(props) {

    const svgId = 'main-svg';
    const mapId = 'main-map';
    const graficElementId = 'main-grafik';
    const mapElementId = 'main-elements';
    const positionId = 'main-position';

    const simplePath = 'main-Voronoi';

    const [marker, setMarker] = usePersistedState('marker', {
        lat: 51.238741,
        lng: 7.107757
    });

    const [transform, setTransform] = usePersistedState('zoom', {
        k:1,
        x:0,
        y:0
    });

    const renderSvg = () => {

        console.log('renderSvg', 2)

        const border = props.features.find((feature)=>{

            return ('aussengrenze' === feature.properties.slug)

        })

        let viewportWidth = window.innerWidth;
        let viewportHeight = window.innerHeight;

        let simpleWay = props.features.find((feature)=>{

            return ('way-simple' === feature.properties.slug)

        })

        let simpleWayCollection = {
            type: "FeatureCollection",
            features: simpleWay.geometry.coordinates.map((coordinate)=>{

                return     {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": coordinate
                    }
                }
            })
        };

        const projection = d3.geoMercator()
            .translate([viewportWidth / 2, viewportHeight / 2]);

        const geoPath = d3.geoPath()
            .projection(projection);

        var center = d3.geoCentroid(border);

        projection
            .scale(3000000)
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
            .attr("opacity", (d)=>{
                return 0.3;
                return d.properties.opacity;
            })
            .attr("id", (d)=>{
                console.log(d.properties.slug)
                return d.properties.slug;
            })
            .attr("d", geoPath)
            .attr('title', (d) => {
                if(undefined === d.properties || undefined === d.properties.name){
                    return;
                }

                return  d.properties.name;
            });

        /*
        7.105611562728882
        51.24177020918754

        7.115809321403503
        51.236776961813064
        */

        /*
        const left = 7.105611562728882;
        const right = 7.115809321403503;

        const top = 51.24177020918754;
        const bottom = 51.236776961813064;


        let boundCollection = {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    properties: {
                        name: "Außengrenze",
                        slug: "aussengrenze",
                        zIndex: 1,
                        fill: "#000fff"
                    },
                    geometry: {
                        type: "LineString",
                        coordinates: [
                            [
                                left,
                                top,
                            ],
                            [
                                right,
                                top,
                            ],
                            [
                                right,
                                bottom,
                            ],
                            [
                                left,
                                bottom,
                            ],
                        ]
                    }
                },

            ]
        };

        elementsGroup.selectAll("path")
            .data(boundCollection.features)
            .enter()
            .append("path")
            .attr("fill", 'lime')
            .attr("stroke", 'red')
            .attr("opacity", '0.4')
            .attr("id", 'bound')
            .attr("d", geoPath)
        ;
         */

        const bound = mapSvg.select(`#bounding-box`);
        console.log(bound.node().getBBox())
        const boundingBox = bound.node().getBBox();

        console.log(boundingBox.width / 2550)

        const graficElementGroup = mapSvg.select(`#${graficElementId}`);
        console.log(graficElementGroup);
        graficElementGroup
            .attr("transform", "translate(" + boundingBox.x + "," + boundingBox.y + ") scale(0.20939347809436273)");

        var voronoiGroup = mapSvg.select(`#${simplePath}`);
                console.log()

        let points = voronoiGroup.selectAll("circle")
            .data(simpleWayCollection.features)
            .enter()
            .append("circle")
            .attr("transform", function(d) { return "translate(" + geoPath.centroid(d) + ")"; })
            .attr("fill", (d)=>{
                return '#f00';
            })
            .attr("stroke", (d)=>{
                return '#0f0';
            })
            .attr("d", geoPath)
            .attr("r", 5);


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

        };


        simpleWayCollection.features.forEach((feature)=>{

            //console.log(feature.geometry.coordinates[0])

            //console.log(d3.geoDistance([marker.lng, marker.lat], feature.geometry.coordinates))

            //
        })


        mapSvg.on("click", onClick);

        var zooming = d3.zoom()
            .scaleExtent([0.5, 8])
            .on('zoom', () => {

                mapGroup
                    .attr('transform', d3.event.transform);

            })
            .on('end', () => {

                console.log(d3.event.transform)

                setTransform(d3.event.transform);

            })

        ;


        mapSvg.call(zooming);

        /*
        mapSvg.transition().duration(2500).call(
            zooming.transform,
            d3.zoomIdentity.translate(transform.x, transform.y).scale(transform.k)
        );
        */

        //var t = d3.zoomIdentity.translate(1, 2).scale(3);
        //console.log(t)

        //mapGroup.call(zooming.scaleTo,transform);

        //var zoomOutTransform = d3.zoomIdentity.translate(0, 0).scale(4);

        console.log(transform)

        mapGroup
            //.attr('transform', transform);
            //.attr('transform', 'translate(' + zooming.transform.x + ', ' + zooming.transform.y + ')' + ' scale(' + zooming.transform.k + ')');

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
                    <MapDrawed {...props}></MapDrawed>
                    <g id={mapElementId}></g>
                    <g id={simplePath}></g>
                    <g id={positionId}></g>
                </g>
            </svg>

        </div>
    );

}