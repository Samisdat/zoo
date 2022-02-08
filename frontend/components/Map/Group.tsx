import * as d3 from 'd3';
import React, {useEffect, useRef, useState} from "react";

import {Sketched} from "./Sketched";
import {CurrentPosition} from "./CurrentPosition";
import {Markers} from "./Markers/Markers";
import {centerToFeatureCollection} from "../Distribution/Detail";
import {MapElement} from "../../strapi-api/entity/map-element/map-element";
import {MapTransformInterface, PositionInterface, useMap} from "./Context/MapContext";
import {Edge} from "../../strapi-api/entity/edge/edge";
import {Node} from "../../strapi-api/entity/node/node";
import {Routing} from "./Routing/Routing";
import {Cartesian} from "./Cartesian";
import {GeoBorder} from "./GeoBorder";
import {angle} from "../../constants";
import {Crosshairs} from "./Crosshairs";

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
        state: {path, angle, focus, transform, ref, zoomRef, dimension, center, projection, position},
        dispatch
    } = useMap();


    const map = zoomRef;
    const rotateRef = useRef(null);

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

                const transformTextWithRotate = getTransformTextWithRotate(event.transform + '');

                mapGroup.attr(
                    'transform',
                    transformTextWithRotate
                );

                setZoom(event.transform.k);

            })
            .on('end', (event) => {

                const update: MapTransformInterface = {
                    k: event.transform.k,
                    x: event.transform.x,
                    y: event.transform.y,
                }

                dispatch({
                    type: 'SET_TRANSFORM',
                    transform:update
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
        ;

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

        });

    }, [transform]);

    const svgPoint = (element, x, y) => {

        const svg = d3.select('svg').node() as any;

        const pt = svg.createSVGPoint();
        pt.x = x;
        pt.y = y;

        return pt.matrixTransform( element.getScreenCTM().inverse() );

    }

    const getTransformTextWithRotate = (transformText:string):string => {

        const center = {
            x: dimension.width / 2,
            y: dimension.height / 2,
        };

        var zoomGroup = d3.select(zoomRef.current).node();

        const transformed = svgPoint(zoomRef.current, 100, 100);

        console.log(transformed)

        if(transformText){
            transformText = transformText.replace(/rotate\((.*?)\)/, '')
        }
        else{
            transformText = '';
        }
        const rotate = `rotate(${angle} ${center.x} ${center.y})`;

        transformText = `${transformText.trim()} ${rotate}`;

        return transformText;

    }

    useEffect(() => {

        /*
        const center = {
            x: dimension.width / 2 / transform.k,
            y: dimension.height / 2 / transform.k
        };
         */

        const center = {
            x: dimension.width / 2 / transform.k - transform.x / transform.k,
            y: dimension.height / 2 / transform.k - transform.y / transform.k,
        };

        const mapSvg = d3.select(map.current)

        let transformText = mapSvg.attr('transform');

        transformText = getTransformTextWithRotate(transformText);

        mapSvg.attr('transform', transformText);

    }, [angle, dimension]);

    useEffect(() => {

        if (!path) {
            return;
        }

        createD3Map();

    }, [path, angle]);

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

            {/*
            <CurrentPosition
                zoom={zoom}
            />
            */}
            <Crosshairs
                zoom={zoom}
            />

        </g>
    );

}
