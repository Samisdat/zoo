import * as d3 from 'd3';
import React, {useEffect, useRef, useState} from "react";

import {Sketched} from "./Sketched";
import {CurrentPosition} from "./CurrentPosition";
import {PointOfInterest} from "./PointOfInterest";
import {centerToFeatureCollection} from "../Distribution/Detail";
import {filterGeoJson} from "helper/geojson/filterGeoJson";
import {MapElement} from "../../strapi-api/entity/map-element/map-element";
import {MapTransformInterface, useMap} from "./Context/MapContext";
import {useViewport} from "../viewport/useViewport";

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
}

export const Group = (props:MapGroupProperties) => {

    const { width, height } = useViewport();

    const {
        state: {path, focus, transform},
        dispatch
    } = useMap()

    const map = useRef(null);
    const svgId = 'main-svg';

    const boundingBox = filterGeoJson('bounding_box', props.mapElements);

    const [zoom, setZoom] = useState<number>(transform.k);
    const [zoomDependencies, setZoomDependencies] = useState<ZoomDependencies>({
        mapSvg:undefined,
        zooming:undefined,
    });

    const createD3Map = ()=> {

        var mapSvg = d3.select(`#${svgId}`)

        mapSvg.attr('width', width)
        mapSvg.attr('height', height)

        const mapGroup = d3.select(map.current);

        const zooming = d3.zoom()
            .scaleExtent([0.5, 30])
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
                .translate(width / 2, height / 2)
                .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) /height)))
                .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
        )
        .on("end", ()=>{

            console.log('zoomend')

        });

    }, [focus, path])

    return (
        <g ref={map}>
            <Sketched
                boundingBox={boundingBox}
            />
            {/*
            <Ways
                pathGenerator={props.mapState.pathGenerator}
                geoJson={props.geoJson}
            />
            <Segments
                pathGenerator={props.mapState.pathGenerator}
                geoJson={props.geoJson}
            />
            */}

            <CurrentPosition
                zoom={zoom}
            />
            <PointOfInterest
                zoom={zoom}
                mapElements={props.mapElements}
            />

        </g>
    );

}
