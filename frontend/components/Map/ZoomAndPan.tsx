import * as d3 from 'd3';
import React, {useEffect, useRef, useState, FunctionComponent} from 'react';
import {MapTransformInterface, useMap} from './Context/MapContext';

interface ZoomDependencies {
    mapSvg:any,
    zooming:any,
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ZoomAndPanProps {}

export const ZoomAndPan: FunctionComponent<ZoomAndPanProps> = ({children}) => {

    const {
        state: {path, focus, transform, ref, dimension, center},
        dispatch
    } = useMap();

    const map = useRef(null);

    const [zoomDependencies, setZoomDependencies] = useState<ZoomDependencies>({
        mapSvg:undefined,
        zooming:undefined,
    });

    const createD3Map = ()=> {

        const mapSvg = d3.select(ref.current)

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

        d3.select(ref.current).on('click', (event, d)=>{

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

    useEffect(()=>{

        if (!path) {
            return;
        }

        if(undefined === zoomDependencies.mapSvg || undefined === zoomDependencies.zooming){
            return;
        }

        if(undefined === focus){
            return;
        }

        const rects = focus.map((slug)=>{

            const rect = d3.select(`#box-${slug}`).node();

            const bbox = (rect as Element).getBoundingClientRect();

            return bbox;

        });

        const left = Math.min(...rects.map((rect)=>{

            return rect.x;

        }));

        const right = Math.max(...rects.map((rect)=>{

            return rect.x + rect.width;

        }));

        const top = Math.min(...rects.map((rect)=>{

            return rect.y;

        }));

        const bottom = Math.max(...rects.map((rect)=>{

            return rect.y + rect.height;

        }));

        const x0 = (left - transform.x) / transform.k;
        const y0 = (top - transform.y) / transform.k;
        const x1 = (right - transform.x) / transform.k;
        const y1 = (bottom - transform.y) / transform.k;

        zoomDependencies.mapSvg.transition().delay(300).duration(750).call(
            zoomDependencies.zooming.transform as any,
            d3.zoomIdentity
                .translate(dimension.width / 2, (dimension.height - 200) / 2)
                .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / dimension.width, (y1 - y0) / dimension.height)))
                .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
        )
            .on('end', ()=>{

                console.log('zoomend')

            });



        /*
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
            */
    }, [focus, path])

    return (
        <g
            id={'geo'}
            ref={map}
        >
            {children}
        </g>
    );

}
