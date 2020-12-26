import * as d3 from 'd3';
import {useEffect} from "react";
import {Ways} from "./Ways";
import {Sketched} from "./Sketched";
import {CurrentPosition} from "./CurrentPosition";
import {MapTransformInterface} from "./Interface";
import {Feature} from "geojson";

export const Group = (props) => {

    const svgId = 'main-svg';
    const mapId = 'main-map';

    const createD3Map = ()=> {

        console.log('createD3Map')

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


        const panAndZoomToBox = (box:any) => {

            console.log(JSON.stringify(box, null, 4))


            box.properties.fill = '#f0f0f0';
            box.properties.opacity = 0.3;

            var elementsGroup = mapGroup.select('#zoomBox');
            console.log(elementsGroup)
            elementsGroup.selectAll("path")
                .data([box])
                .enter()
                .append("path")
                .attr("fill", (d:Feature)=>{
                    console.log(d)
                    return '#f0f';
                })
                .attr("opacity", (d:Feature)=>{
                    return 0.5;
                })
                .attr("id", (d:Feature)=>{
                    return d.properties.slug;
                })
                .attr("d", props.mapState.pathGenerator)

        };

        panAndZoomToBox(props.focus);


    };

    useEffect(() => {

        if (undefined === props.mapState) {
            return;
        }

        if (undefined === props.mapState.pathGenerator) {
            return;
        }

        console.log(props);

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
            <g id="zoomBox"></g>
        </g>
    );

}
