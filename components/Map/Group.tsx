import * as d3 from 'd3';
import {useEffect, useState} from "react";
import {Ways} from "./Ways";
import {Sketched} from "./Sketched";
import {CurrentPosition} from "./CurrentPosition";
import {MapStateInterface, MapTransformInterface} from "./Interface";
import {HighlightFocus} from "./HighlightFocus";
import {PointOfInterest} from "./PointOfInterest";
import {Feature} from "geojson";
import {Border} from "./Border";

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

export const Group = (props) => {

    const svgId = 'main-svg';
    const mapId = 'main-map';

    const [zoom, setZoom] = useState<number>(10);

    const createD3Map = ()=> {

        var mapSvg = d3.select(`#${svgId}`)
        const mapGroup = d3.select(`#${mapId}`);

        const zooming = d3.zoom()
            .scaleExtent([0.01, 150000])
            .on('zoom', (event) => {

                mapGroup.attr(
                    'transform',
                    event.transform
                );

            })
            .on('end', (event) => {

                console.log('end')

                const transform: MapTransformInterface = {
                    k: event.transform.k,
                    x: event.transform.x,
                    y: event.transform.y
                }

                props.setTransform(transform);

            });

        // enable zooming
        mapSvg.call(zooming);

        if('none' !== props.navigation.focus){

            mapSvg.on('.zoom', null);
            const centerOfEnclosure = centerToPolygon(props.navigation.focus);

            const [x0, y0] = props.mapState.projection(centerOfEnclosure[0] as any);
            const [x1, y1] = props.mapState.projection(centerOfEnclosure[1] as any);

            const teaserOffset = 150 + 90 + 40

            const k = findBestZoomLevel(x0, x1, y0, y1, props.mapState.width, props.mapState.height - teaserOffset);

            var t2 = d3.zoomIdentity
                .translate(props.mapState.width / 2, (props.mapState.height) / 2)
                .scale(k)
                .translate(-(x0 + x1) / 2, -(y0 + y1 ) / 2)
            ;

            //setZoom(k);

            mapSvg.call(
                (zooming.transform as any),
                t2
            );
            props.setFocus('none')

        }

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

    return (
        <g id={mapId}>
            <Border
                pathGenerator={props.mapState.pathGenerator}
                geoJson={props.geoJson}
            />
            <Sketched
                mapState={props.mapState}
                geoJson={props.geoJson}
            />
            <Ways
                pathGenerator={props.mapState.pathGenerator}
                geoJson={props.geoJson}
            />
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
