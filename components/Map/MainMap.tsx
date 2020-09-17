import {useEffect, useState} from 'react';

import * as d3 from 'd3';

import {usePersistedState} from "hooks/persisted-state";
import {
    getCurrentPositionGeoJson
} from "helper/getCurrentPosition";

import DrawedElementes from 'components/Map/DrawedElementes';
import dynamic from "next/dynamic";

const CurrentPosition = dynamic(() => import('components/Map/CurrentPosition'), {
    ssr: false
});


import {MapContext} from 'components/Map/Context';

export default function MainMap(props) {

    const svgId = 'main-svg';
    const mapId = 'main-map';
    const graficElementId = 'main-grafik';
    const mapElementId = 'main-elements';
    const positionId = 'main-position';

    const simplePath = 'main-Voronoi';

    let geoPath = undefined;
    let foobar = undefined;

    const [marker, setMarker] = usePersistedState('marker', {
        lat: 51.238741,
        lng: 7.107757,
        isWithin: true,
        text: 'Map Marker Text'
    });

    const changeMarker = (text:string) => {
        console.log('Call from child', text);

        setMarker(
            {
                ...marker,
                text:text
            }
        )
    }


    const [transform, setTransform] = usePersistedState('zoom', {
        k:1,
        x:0,
        y:0
    });

    const [mainText, setMainText] = usePersistedState('main-text', 'Map Main State');

    console.log(mainText)

    const renderSvg = () => {

        foobar = 'super';

        let viewportWidth = window.innerWidth;
        let viewportHeight = window.innerHeight;

        const projection = d3.geoMercator()
            .translate([viewportWidth / 2, viewportHeight / 2]);

        geoPath = d3.geoPath()
            .projection(projection);

        MapContext.Consumer.geoPath = geoPath;
        console.log(MapContext.Consumer.geoPath)

        var center = d3.geoCentroid(props.border);

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
            .data(props.boundingBox.features)
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
                return d.properties.slug;
            })
            .attr("d", geoPath)
            .attr('title', (d) => {
                if(undefined === d.properties || undefined === d.properties.name){
                    return;
                }

                return  d.properties.name;
            });

        const bound = mapSvg.select(`#bounding-box`);

        const boundingBox = bound.node().getBBox();

        //console.log(boundingBox.width / 2550)

        const graficElementGroup = mapSvg.select(`#${graficElementId}`);

        graficElementGroup
            .attr("transform", "translate(" + boundingBox.x + "," + boundingBox.y + ") scale(0.20939347809436273)");

        var simplePathGroup = mapSvg.select(`#${simplePath}`);

        let points = simplePathGroup.selectAll("circle")
            .data(props.ways.features)
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

        /*
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

         */

        function onClick() {

            const position = projection.invert(d3.mouse(this))

            setMarker({
                lng: position[0],
                lat: position[1],
                isWithin: d3.geoContains(props.border, position),
                text: 'Map Marker Text Update'
            })

            console.log(marker)

        };


        props.ways.features.forEach((feature)=>{

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
                    <DrawedElementes {...props}></DrawedElementes>
                    <g id={mapElementId}></g>
                    <g id={simplePath}></g>

                    <text id="eins" x="10" y="120" style={{
                        color: '#fff',
                        fontWeight: 'bold'
                    }}>{mainText}</text>
                    <CurrentPosition callback={changeMarker} {...marker} />
                </g>
            </svg>

        </div>
    );

}