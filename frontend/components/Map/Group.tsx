import * as d3 from 'd3';
import React, {useEffect, useRef, useState} from "react";

import {Sketched} from "./Sketched";
import {CurrentPosition} from "./CurrentPosition";
import {Markers} from "./Markers/Markers";
import {centerToFeatureCollection} from "../Distribution/Detail";
import {filterGeoJson} from "helper/geojson/filterGeoJson";
import {MapElement} from "../../strapi-api/entity/map-element/map-element";
import {MapTransformInterface, PositionInterface, useMap} from "./Context/MapContext";
import {Edge} from "../../strapi-api/entity/edge/edge";
import {Node} from "../../strapi-api/entity/node/node";
import {Routing} from "./Routing/Routing";
import {Feature} from "geojson";
import {getCurrentPositionGeoJson} from "../../helper/getCurrentPosition";


// zoom until focus.width or focus.height extends window.width or window.height
export const findBestZoomLevel = (x0, x1, y0, y1, maxWidth, maxHeight) => {

    const minZoom = 0.1;
    const maxZoom = 20;

    const width = Math.abs(x0 - x1);
    const height = Math.abs(y0 - y1);

    let k = minZoom;

    while ( ( 1.1 * width ) * k < maxWidth && ( 1.1 * height ) * k < maxHeight) {

        if(k >= maxZoom){
            break;
        }

        k += 0.01;
    }

    return k;
}


const centerToPolygon = (polygon) => {

    const latitudes = polygon.geometry.coordinates[0].map((coordinate)=>{
        return coordinate[1];
    });

    const longitudes = polygon.geometry.coordinates[0].map((coordinate)=>{
        return coordinate[0];
    });


    let north = Math.max(...latitudes);
    let south = Math.min(...latitudes);

    let west = Math.max(...longitudes);
    let east = Math.min(...longitudes);

    return [
        [east, north],
        [west, south],
    ];

}

interface ZoomDependencies {
    mapSvg:any,
    zooming:any,
}

interface MapGroupProperties {
    fullsize: boolean;
    mapElements: MapElement[];
    nodes: Node[];
    edges:Edge[];
}

export const Group = (props:MapGroupProperties) => {

    const {
        state: {path, focus, transform, ref, dimension, center, projection, position},
        dispatch
    } = useMap();

    const map = useRef(null);

    const boundingBox = filterGeoJson('bounding_box', props.mapElements);

    const [zoom, setZoom] = useState<number>(transform.k);
    const [zoomDependencies, setZoomDependencies] = useState<ZoomDependencies>({
        mapSvg:undefined,
        zooming:undefined,
    });

    const points = props.mapElements.filter((mapElement:MapElement) => {

        if('point' === mapElement.properties.type){
            return true;
        }

        return false;

    });

    const createD3Map = ()=> {

        var mapSvg = d3.select(ref.current)

        mapSvg.attr('width', dimension.width);
        mapSvg.attr('height', dimension.height);

        const mapGroup = d3.select(map.current);

        const zooming = d3.zoom()
            .scaleExtent([1, 25])
            //.translateExtent([[-100,0], [props.mapDimension.width, props.mapDimension.height]])
            //.extent([[-100, 0], [props.mapDimension.width, props.mapDimension.height]])
            .on('zoom', (event) => {

                mapGroup.attr(
                    'transform',
                    event.transform
                );

                setZoom(event.transform.k);

            })
            .on('end', (event) => {

                const transform: MapTransformInterface = {
                    k: event.transform.k,
                    x: event.transform.x,
                    y: event.transform.y
                }

                dispatch({
                    type: 'SET_TRANSFORM',
                    transform
                });
                //props.setTransform(transform);

            });

        setZoomDependencies({
            mapSvg:mapSvg,
            zooming:zooming
        });

        // enable zooming
        mapSvg.call(zooming);

        mapSvg.on("click", (event, d)=>{

            const [lng, lat] = projection.invert(d3.pointer(event));

            console.log(lng, lat);

            const currentPosition = getCurrentPositionGeoJson('click', lat, lng);


            var positionGroup = d3.select('#foobar');

            console.log(d3.pointer(event))

            const radius = 8;

            positionGroup.selectAll('circle')
                .data([d3.pointer(event)])
                .join('circle')
                .attr('cx', function(d) {
                    return d[0];
                })
                .attr('cy', function(d) {
                    return d[1];
                })
                .attr('stroke', (d, i)=>{
                    return 'blue';
                })
                .attr('stroke-width', (d, i)=>{
                    return 1;
                })
                .attr('vector-effect', (d, i)=>{
                    return 'non-scaling-stroke'
                    return 1;
                })
                .attr('fill', (d, i)=>{

                    return 'green';

                })
                .attr('r', 5)
                
            ;


            /*
            positionGroup.selectAll('circle')
                .data(currentPosition)
                .join('circle')

                .attr('transform', function(d) { return 'translate(' + path.centroid(d as Feature) + ')'; })
                .attr('title', (d)=>{
                    //return d.properties.slug;
                })
                .attr('opacity', (d, i)=>{
                    return 1;
                })
                .attr('fill', (d, i)=>{
                    return 'green';
                })
                .attr('stroke', (d, i)=>{
                    return 'blue';
                })
                .attr('d', path as any)
                .attr('r', 8 );
                */

            return;

            /*
            const [lng, lat] = projection.invert(d3.pointer(event));

            const newPosition: PositionInterface = {
                isGPS: false,
                isWithin: true,
                text: 'click',
                lat,
                lng
            };

            dispatch({
                type: 'SET_POSITION',
                position: newPosition
            });

            */


        });

        const t = d3.zoomIdentity
            .translate(
                transform.x,
                transform.y
            )
            .scale(transform.k);

        mapSvg.call(
            (zooming.transform as any),
            t
        );

    };

    useEffect(() => {

        if (!path) {
            return;
        }

        createD3Map();

    }, [path]);

    useEffect(()=>{

        if (!path) {
            return;
        }

        if(undefined === zoomDependencies.mapSvg || undefined === zoomDependencies.zooming){
            return;
        }

        //zoomDependencies.mapSvg.on('.zoom', null);
        const centerOfEnclosure = centerToFeatureCollection([(  focus as MapElement)]);

        const [[x0, y0], [x1, y1]] = path.bounds(centerOfEnclosure as any);

        zoomDependencies.mapSvg.transition().delay(300).duration(750).call(
            zoomDependencies.zooming.transform as any,
            d3.zoomIdentity
                .translate(dimension.width / 2, (dimension.height - 200) / 2)
                .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / dimension.width, (y1 - y0) / dimension.height)))
                .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
        )
        .on("end", ()=>{

            console.log('zoomend')

        });

    }, [focus, path])

    useEffect(()=>{

        if (!path) {
            return;
        }

        if(undefined === zoomDependencies.mapSvg || undefined === zoomDependencies.zooming){
            return;
        }

        if(undefined === center){
            return;
        }

        const centerOfEnclosure = centerToFeatureCollection(center);

        const [[x0, y0], [x1, y1]] = path.bounds(centerOfEnclosure as any);

        zoomDependencies.mapSvg.transition().delay(300).duration(750).call(
            zoomDependencies.zooming.transform as any,
            d3.zoomIdentity
                .translate(dimension.width / 2, (dimension.height - 200) / 2)
                .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / dimension.width, (y1 - y0) / dimension.height)))
                .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
        )
            .on("end", ()=>{

                console.log('zoomend')

                dispatch({
                    type: 'SET_ZOOM_AND_PAN',
                    center: undefined,
                });


            });

    }, [center, path])

    return (
        <g ref={map}>
            <Sketched
                boundingBox={boundingBox}
            />

            <Routing
                nodes={props.nodes}
                edges={props.edges}
            />

            {/*
            <Markers
                zoom={zoom}
                mapElements={points}
            />
            */}

            <CurrentPosition
                zoom={zoom}
            />

            <g id="foobar"></g>

        </g>
    );

}
