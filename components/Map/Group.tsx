import * as d3 from 'd3';
import React, {useEffect, useState} from "react";
import {Ways} from "./Ways";
import {Sketched} from "./Sketched";
import {CurrentPosition} from "./CurrentPosition";
import {MapStateInterface, MapTransformInterface} from "./Interface";
import {PointOfInterest} from "./PointOfInterest";
import {Feature} from "geojson";
import {centerToFeatureCollection} from "../Distribution/Detail";
import {MapFocus} from "../../pages";
import {MapSearch} from "./Search";
import {Segments} from "./Segments";

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

export const Group = (props) => {

    const svgId = 'main-svg';
    const mapId = 'main-map';

    const [autoZoom, setAutoZoom] = useState<boolean>(false);
    const [zoom, setZoom] = useState<number>(props.mapState.transform.k);
    const [focus, setFocus] = useState<MapFocus>("none");
    const [zoomDependencies, setZoomDependencies] = useState<ZoomDependencies>({
        mapSvg:undefined,
        zooming:undefined,
    });

    const createD3Map = ()=> {

        var mapSvg = d3.select(`#${svgId}`)

        mapSvg.attr('width', props.mapDimension.width)
        mapSvg.attr('height', props.mapDimension.height)

        const mapGroup = d3.select(`#${mapId}`);

        const zooming = d3.zoom()
            .scaleExtent([0.01, 150000])
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

                props.setTransform(transform);

            });

        setZoomDependencies({
            mapSvg:mapSvg,
            zooming:zooming
        });

        // enable zooming
        mapSvg.call(zooming);

        console.log()

        const t = d3.zoomIdentity
            .translate(
                props.mapState.transform.x,
                props.mapState.transform.y
            )
            .scale(props.mapState.transform.k);

        mapSvg.call(
            (zooming.transform as any),
            t
        );

        /*
        if('none' !== props.focus){

            //mapSvg.on('.zoom', null);
            const centerOfEnclosure = centerToFeatureCollection({
                features:[props.focus],
                type:'FeatureCollection'
            });

            const [[x0, y0], [x1, y1]] = props.mapState.pathGenerator.bounds(centerOfEnclosure as any);

            mapSvg.call(
                zooming.transform as any,
                d3.zoomIdentity
                    .translate(props.mapDimension.width / 2, props.mapDimension.height / 2)
                    .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / props.mapDimension.width, (y1 - y0) / props.mapDimension.height)))
                    .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
            );

            //props.setFocus('none')

        }

         */

    };

    useEffect(() => {

        if (undefined === props.mapState) {
            return;
        }

        if (undefined === props.mapState.pathGenerator) {
            return;
        }

        createD3Map();

    }, [props.mapState]);

    useEffect(()=>{

        if(undefined === zoomDependencies.mapSvg || undefined === zoomDependencies.zooming){
            return;
        }

        //zoomDependencies.mapSvg.on('.zoom', null);
        const centerOfEnclosure = centerToFeatureCollection({
            features:[props.focus],
            type:'FeatureCollection'
        });

        const [[x0, y0], [x1, y1]] = props.mapState.pathGenerator.bounds(centerOfEnclosure as any);

        setAutoZoom(true);

        zoomDependencies.mapSvg.transition().duration(500).call(
            zoomDependencies.zooming.transform as any,
            d3.zoomIdentity
                .translate(props.mapDimension.width / 2, props.mapDimension.height / 2)
                .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / props.mapDimension.width, (y1 - y0) / props.mapDimension.height)))
                .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
        )
        .on("end", ()=>{

            props.setTeaser({
                apiUrl: '/api/teaser/animals/afrikanischer-elefant',
                    close: ()=>{
                        props.setTeaser(undefined);
            }}  );

        });




    }, [props.focus])

    return (
        <g id={mapId}>
            <Sketched
                mapState={props.mapState}
                geoJson={props.geoJson}
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
                pathGenerator={props.mapState.pathGenerator}
                zoom={zoom}
                marker={props.mapState.marker}
            />
            <PointOfInterest
                pathGenerator={props.mapState.pathGenerator}
                projection={props.mapState.projection}
                zoom={zoom}
                geoJson={props.geoJson}
            />
        </g>
    );

}
