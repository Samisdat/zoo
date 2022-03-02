import * as d3 from 'd3';
import React, {useEffect, useRef, useState, FunctionComponent} from "react";
import {MapTransformInterface, useMap} from "./Context/MapContext";
import {centerToFeatureCollection} from "../Distribution/Detail";

interface ZoomDependencies {
    mapSvg:any,
    zooming:any,
}

interface ZoomAndPanProps {}

export const ZoomAndPan: FunctionComponent<ZoomAndPanProps> = ({children}) => {

    const {
        state: {path, focus, transform, ref, dimension, center},
        dispatch
    } = useMap();

    const map = useRef(null);
    const debug = useRef(null);

    const [zoomDependencies, setZoomDependencies] = useState<ZoomDependencies>({
        mapSvg:undefined,
        zooming:undefined,
    });

    const createD3Map = ()=> {

        var mapSvg = d3.select(ref.current)

        const mapGroup = d3.select(map.current);

        const zooming = d3.zoom()
            .scaleExtent([1, 25])
            .on('zoom', (event) => {

                mapGroup.attr(
                    'transform',
                    event.transform
                );

                dispatch({
                    type: 'SET_ZOOM',
                    zoom: event.transform.k
                });


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

            const x = clickX;
            const y = clickY;

            dispatch({
                type: 'SET_POINT_EXCHANGE',
                exchange: {
                    position:{
                        x,
                        y
                    },
                },

            });


            /*
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

            */
        });

    }, [transform]);


    useEffect(() => {

        if (!path) {
            return;
        }

        createD3Map();

    }, [path]);

    useEffect(() => {

        //console.log(transform.k)

    }, [transform.k]);

    useEffect(()=>{

        if (!path) {
            return;
        }

        if(undefined === zoomDependencies.mapSvg || undefined === zoomDependencies.zooming){
            return;
        }

        if(!focus){
            return;
        }

        const rect = d3.select(`#box-${focus.slug}`).node();

        const bbox = (rect as Element).getBoundingClientRect();

        const x0 = (bbox.left - transform.x) / transform.k;
        const y0 = (bbox.top - transform.y) / transform.k;
        const x1 = x0 + bbox.width / transform.k;
        const y1 = y0 + bbox.height / transform.k;

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

        const rects = center.map((slug)=>{

            const rect = d3.select(`#box-${slug}`).node();

            const bbox = (rect as Element).getBoundingClientRect();

            return bbox;

        });

        console.log(rects);

        const left = Math.min(...rects.map((rect)=>{

            return rect.x;

        }));

        console.log(left)

        const right = Math.max(...rects.map((rect)=>{

            return rect.x + rect.width;

        }));

        console.log(right)

        const top = Math.min(...rects.map((rect)=>{

            return rect.y;

        }));

        console.log(top)

        const bottom = Math.max(...rects.map((rect)=>{

            return rect.y + rect.height;

        }));

        console.log(bottom)

        const _x0 = (left - transform.x) / transform.k;
        const _y0 = (top - transform.y) / transform.k;
        const _x1 = (right - transform.x) / transform.k;
        const _y1 = (bottom - transform.y) / transform.k;

        /* */
        const rect = d3.select(debug.current).append('rect');

        rect.attr('x', _x0)
        rect.attr('y', _y0)
        rect.attr('width', (right - left) / transform.k)
        rect.attr('height', (bottom - top) / transform.k)

        rect.attr('fill', '#a9d3df')
        rect.attr('stroke', '#000')
        rect.attr('strokeWidth', '1.67px')
        rect.attr('opacity', 0.5)

        console.log(rect)
        /* */

        zoomDependencies.mapSvg.transition().delay(300).duration(750).call(
            zoomDependencies.zooming.transform as any,
            d3.zoomIdentity
                .translate(dimension.width / 2, (dimension.height - 200) / 2)
                .scale(Math.min(8, 0.9 / Math.max((_x1 - _x0) / dimension.width, (_y1 - _y0) / dimension.height)))
                .translate(-(_x0 + _x1) / 2, -(_y0 + _y1) / 2)
        )
            .on("end", ()=>{

                console.log('zoomend')

            });




        return;

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
        <g
            id={'geo'}
            ref={map}
        >
            {children}
            {/* */}
            <g
                ref={debug}
            />
            {/* */}
        </g>
    );

}
