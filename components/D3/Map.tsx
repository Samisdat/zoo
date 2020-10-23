import {useEffect} from 'react';

import * as d3 from 'd3';

import {usePersistedState} from "hooks/persisted-state";

import {Sketched} from 'components/D3/Sketched';
import {CurrentPosition} from 'components/D3/CurrentPosition';
import {Ways} from "components/D3/Ways";

import createPersistedState from 'use-persisted-state';
const useMarkerState = createPersistedState('marker');

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

    const [d3PropertiesState, setD3PropertiesState] = usePersistedState('d3',undefined);

    const [marker, setMarker] = useMarkerState({
        lat: 51.238741,
        lng: 7.107757
    });

    const createD3Map = ()=> {

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

        const markerProperty: Marker = {
            lat: marker.lat,
            lng: marker.lng,
            isWithin: true,
            text: 'Map Marker Text'
        };


        const d3Properties: D3MapProperties = {
            width: width,
            height: height,
            geoPath: geoPath,
            marker: markerProperty,
            transform: {
                k:1,
                x:0,
                y:0
            }
        };

        setD3PropertiesState(d3Properties);

    };

    useEffect(() => {

        console.log(marker)

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
