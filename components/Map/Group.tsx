import * as d3 from 'd3';
import {useEffect} from "react";
import {Ways} from "./Ways";
import {Sketched} from "./Sketched";
import {CurrentPosition} from "./CurrentPosition";
import {MapTransformInterface} from "./Interface";

export const Group = (props) => {

    const svgId = 'main-svg';
    const mapId = 'main-map';

    const createD3Map = ()=> {

        var mapSvg = d3.select(`#${svgId}`)
        const mapGroup = d3.select(`#${mapId}`);

        const zooming = d3.zoom()
            .scaleExtent([0.5, 15])
            .on('zoom', () => {

                mapGroup.attr(
                    'transform',
                    d3.event.transform
                );

            })
            .on('end', () => {

                const transform: MapTransformInterface = {
                    k: d3.event.transform.k,
                    x: d3.event.transform.x,
                    y: d3.event.transform.y
                }

                props.setTransform(transform);

            });

        // set inital  zoom
        const t = d3.zoomIdentity
            .translate(
                props.mapState.transform.x,
                props.mapState.transform.y
            )
            .scale(props.mapState.transform.k);

        mapSvg.call((zooming.transform as any), t);

        // enable zooming
        mapSvg.call(zooming);

    };

    useEffect(() => {

        if (undefined === props.mapState) {
            return;
        }

        if (undefined === props.mapState.pathGenerator) {
            return;
        }

        createD3Map();

    });

    return (
        <g id={mapId}>
            <Sketched
                mapState={props.mapState}
                boundingBox={props.boundingBox}
            />
            <Ways
                pathGenerator={props.mapState.pathGenerator}
                simpleWays={props.simpleWays}
            />
            <CurrentPosition
                pathGenerator={props.mapState.pathGenerator}
                marker={props.mapState.marker}
            />
        </g>
    );

}
