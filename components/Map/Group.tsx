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


        //const topLeft = projection(centerOfPolygon);

        //const centerOfEnclosure = d3.geoCentroid(centerTo);

        const centerOfEnclosure = centerToPolygon(props.focus);

        const [x0, y0] = props.mapState.projection(centerOfEnclosure[0] as any);
        const [x1, y1] = props.mapState.projection(centerOfEnclosure[1] as any);



        //[[x0, y0], [x1, y1]]
        console.log(x0, y0, x1, y1)

        //const x = -1 * topLeft[0];
        //const y = -1 * topLeft[1];
        const k = 6;

        const scale = Math.min(8, 0.9 / Math.max((x1 - x0) / props.mapState.width, (y1 - y0) / props.mapState.height));
        console.log(scale)

        var t2 = d3.zoomIdentity
            .translate(props.mapState.width / 2, props.mapState.height / 2)
            .scale(k)
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
        ;

        mapSvg.call(
            (zooming.transform as any),
            t2
        );

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
