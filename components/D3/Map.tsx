import {useEffect, useState} from 'react';

import * as d3 from 'd3';

import {usePersistedState} from "hooks/persisted-state";

import Sketched from 'components/D3/Sketched';
import CurrentPosition from 'components/D3/CurrentPosition';
import Ways from "components/D3/Ways";

export default function Parent(props) {

    const svgId = 'main-svg';
    const mapId = 'main-map';

    const [d3PropertiesState, setD3PropertiesState] = usePersistedState('d3',undefined);

    const createD3Map = ()=> {
        console.log('createD3Map')

        const width = window.innerWidth;
        const height = window.innerHeight;

        const projection = d3.geoMercator()
            .translate([width / 2, height / 2]);

        const geoPath =  d3.geoPath().projection(projection);

        var center = d3.geoCentroid(props.border);

        projection
            .scale(3000000)
            .center(center)

        var mapSvg = d3.select(`#${svgId}`)
            .attr("width", width + 'px')
            .attr("height", height + 'px')
            .attr("style", 'background:blue')
        ;

        const mapGroup = mapSvg.select(`#${mapId}`);

        function onClick() {

            const position = projection.invert(d3.mouse(this))

            console.log(position)

        };

        mapSvg.on("click", onClick);

        var zooming = d3.zoom()
            .scaleExtent([0.5, 8])
            .on('zoom', () => {

                mapGroup
                    .attr('transform', d3.event.transform);

            })
            .on('end', () => {
                console.log(d3.event.transform);
                //setTransform(d3.event.transform);

            });

        mapSvg.call(zooming);

        const marker = {
            lat: 51.238741,
            lng: 7.107757,
            isWithin: true,
            text: 'Map Marker Text'
        };


        const d3Properties = {
            width: width,
            height: height,
            geoPath: geoPath,
            marker: marker,
            transform: {
                k:1,
                x:0,
                y:0
            }
        };

        setD3PropertiesState(d3Properties);

    };

    useEffect(() => {
        console.log('parent useEffect');

        if(undefined === d3PropertiesState){
            createD3Map();
        }

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
                    <Sketched d3PropertiesState={d3PropertiesState} {...props}></Sketched>
                    <Ways  d3PropertiesState={d3PropertiesState} simpleWay={props.simpleWay}{...props.ways}></Ways>
                    <CurrentPosition d3PropertiesState={d3PropertiesState}></CurrentPosition>
                </g>
            </svg>


        </div>
    );

}
