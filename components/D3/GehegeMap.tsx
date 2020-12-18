import {useEffect} from 'react';

import * as d3 from 'd3';

import {Sketched} from 'components/D3/Sketched';
import {CurrentPosition} from 'components/D3/CurrentPosition';
import {Ways} from "components/D3/Ways";

import createPersistedState from 'use-persisted-state';
import {Feature} from "geojson";
import {border} from "@material-ui/system";
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

export const GehegeMap = (props) => {

    const svgId = 'main-svg';
    const mapId = 'main-map';

    const [d3PropertiesState, setD3PropertiesState] = useD3State(d3PropertiesDefault);

    const createD3Map = (centerTo:Feature) => {

        const width = props.dimensions.width;
        const height = props.dimensions.height;

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

        mapSvg.call(
            (zooming.transform as any),
            t
        );

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

        const panAndZoomToBox = (box:any) => {

            box.properties.fill = '#f0f0f0';
            box.properties.opacity = 0.3;

            var elementsGroup = mapGroup.select('#zoomBox');


            elementsGroup.selectAll("path")
                .data([box])
                .enter()
                .append("path")
                .attr("fill", (d:Feature)=>{
                    return '#f0f';
                })
                .attr("opacity", (d:Feature)=>{
                    return 0.5;
                })
                .attr("id", (d:Feature)=>{
                    return d.properties.slug;
                })
                .attr("d", geoPath)

            /*
            const [[x0, y0], [x1, y1]] = d3.geoBounds(box);

            console.log(x0, y0, x1, y1);

            var t = d3.zoomIdentity.translate(-(x0 + x1) / 2, -(y0 + y1) / 2)

            var center = d3.geoCentroid(box);

            projection
                .scale(3000000)
                .center(center)


            mapSvg.call(zooming.transform, t);

             */

            console.log(centerTo)


        };

        panAndZoomToBox(centerTo);
    };

    useEffect(() => {

        console.log('GehegeMap.useEffect 1');

        if(undefined === props.dimensions.width){
            return;
        }

        console.log('GehegeMap.useEffect 2');

        if(undefined === d3PropertiesState || undefined === d3PropertiesState.geoPath){

            const gehege = props.zoomBoxes.features.find((feature)=>{

                return (props.slug === feature.properties.slug);

            });

            createD3Map(gehege);
        }

    });

    return (
        <svg id={svgId}>
            <g id={mapId}>
                <Sketched d3PropertiesState={d3PropertiesState} {...props}></Sketched>
                <g id="zoomBox"></g>
            </g>

        </svg>
    );

}
