import {useEffect} from 'react';

import * as d3 from 'd3';

import {Sketched} from 'components/D3/Sketched';
import {CurrentPosition} from 'components/D3/CurrentPosition';
import {Ways} from "components/D3/Ways";

import createPersistedState from 'use-persisted-state';
const useD3State = createPersistedState('d3');

export interface Marker {
    lat: number;
    lng: number;
    isWithin: boolean;
    text: string;
}

export interface D3MapProperties {
    width: number;
    height: number;
    geoPath: any;
    marker: Marker;
    transform: { x: number; y: number; k: number };
}

const markerPropertyDefault: Marker = {
    lat: 51.238741,
    lng: 7.107757,
    isWithin: true,
    text: 'Map Marker Text'
};

export const d3PropertiesDefault: D3MapProperties = {
    width: 500,
    height: 500,
    geoPath: undefined,
    marker: markerPropertyDefault,
    transform: {
        k:1,
        x:0,
        y:0
    }
};

export const Map = (props) => {

    const svgId = 'main-svg';
    const mapId = 'main-map';

    const [d3PropertiesState, setD3PropertiesState] = useD3State(d3PropertiesDefault);

    const createD3Map = ()=> {

        const width = window.innerWidth;
        const height = window.innerHeight;

        const projection = d3.geoMercator()
            .translate([width / 2, height / 2])
            .angle(180)
        ;

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

            const updateD3State = {
                ...d3PropertiesState,
                marker:{
                    lat: position[1],
                    lng: position[0],
                    // always within
                    isWithin: true,
                    text: 'Super'
                }
            };

            console.log(updateD3State)
            setD3PropertiesState(updateD3State);


        };

        mapSvg.on("click", onClick);

        var zooming = d3.zoom()
            .scaleExtent([0.5, 15])
            .on('zoom', () => {

                mapGroup
                    .attr('transform', d3.event.transform);

            })
            .on('end', () => {


                const updateD3 = {
                    ...d3PropertiesState,
                    transform: {
                        k: d3.event.transform.k,
                        x: d3.event.transform.x,
                        y: d3.event.transform.y
                    }
                };

                setD3PropertiesState(updateD3);

            });

        var t = d3.zoomIdentity.translate(
            d3PropertiesState.transform.x,
            d3PropertiesState.transform.y)
        .scale(d3PropertiesState.transform.k);

        mapSvg.call(zooming.transform, t);

        mapSvg.call(zooming);

        const markerProperty: Marker = {
            lat: d3PropertiesState.marker.lat,
            lng: d3PropertiesState.marker.lng,
            isWithin: true,
            text: 'Map Marker Text'
        };


        const d3Properties: D3MapProperties = {
            width: width,
            height: height,
            geoPath: geoPath,
            marker: markerProperty,
            transform: {
                k: d3PropertiesState.transform.k,
                x: d3PropertiesState.transform.x,
                y: d3PropertiesState.transform.y
            }
        };

        setD3PropertiesState(d3Properties);

    };

    useEffect(() => {

        if(undefined === d3PropertiesState || undefined === d3PropertiesState.geoPath){
            createD3Map();
        }

    });

    return (
        <svg id={svgId} style={{
            width: '100%',
            height: '100%',
            background: 'red'
        }}
        >
            <g id={mapId}>
                <Sketched d3PropertiesState={d3PropertiesState} {...props}></Sketched>
                <Ways  d3PropertiesState={d3PropertiesState} simpleWays={props.simpleWays}></Ways>
                <CurrentPosition d3PropertiesState={d3PropertiesState}></CurrentPosition>
            </g>
        </svg>
    );

}
