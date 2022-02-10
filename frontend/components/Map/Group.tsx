import * as d3 from 'd3';
import React, {useEffect, useRef, useState} from "react";

import {Sketched} from "./Sketched";
import {CurrentPosition} from "./CurrentPosition";
import {Markers} from "./Markers/Markers";
import {centerToFeatureCollection} from "../Distribution/Detail";
import {MapElement} from "../../strapi-api/entity/map-element/map-element";
import {MapTransformInterface, PositionInterface, PositionRawInterface, useMap} from "./Context/MapContext";
import {Edge} from "../../strapi-api/entity/edge/edge";
import {Node} from "../../strapi-api/entity/node/node";
import {Routing} from "./Routing/Routing";
import {Cartesian} from "./Cartesian";
import {GeoBorder} from "./GeoBorder";
import {GPXViewer} from "../GPX/Viewer";

interface ZoomDependencies {
    mapSvg:any,
    zooming:any,
}

interface MapGroupProperties {
    fullsize: boolean;
    mapElements: MapElement[];
    nodes: Node[];
    edges:Edge[];
    boundingBox:MapElement;
}

export const Group = (props:MapGroupProperties) => {

    const {
        state: {path, focus, transform, ref, dimension, center, projection, position},
        dispatch
    } = useMap();


    const map = useRef(null);

    const [zoom, setZoom] = useState<number>(transform.k);
    const [zoomDependencies, setZoomDependencies] = useState<ZoomDependencies>({
        mapSvg:undefined,
        zooming:undefined,
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

        d3.select(ref.current).on("click", (event, d)=>{

            const [clickX, clickY] = d3.pointer(event);

            const x = (clickX - transform.x) / transform.k;
            const y = (clickY - transform.y) / transform.k

            const [lng, lat] = projection.invert([x, y]);

            const position_raw: PositionRawInterface = {
                lat,
                lng,
                type:'dev'
            };

            dispatch({
                type: 'SET_POSITION_RAW',
                position_raw
            });

            /*
            dispatch({
                type: 'SET_POSITION',
                position: newPosition
            });
            */
        });

    }, [transform]);


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

            <GeoBorder />

            <Cartesian
                boundingBox={props.boundingBox}
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
            <GPXViewer/>

        </g>
    );

}
