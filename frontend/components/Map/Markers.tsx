import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {MapElement} from "../../strapi-api/entity/map-element/map-element";
import {useMap} from "./Context/MapContext";
import {Feature} from "geojson";
import {getImagePath} from "../../helper/getImagePath";

export interface PointOfInterestProperties{
    mapElements:MapElement[];
    zoom:number;
};

interface MarkerInterface{
    id:number;
    left:number;
    right:number;
    top:number;
    bottom:number;
    overlap:number[];
}

export const Markers = (props:PointOfInterestProperties) => {

    const {
        state: {path},
    } = useMap();

    const markersGroup = useRef(null);

    let pois = props.mapElements.filter((mapElement:MapElement) => {

        if('point' === mapElement.properties.type){
            return true;
        }

        return false;

    });

    useEffect(() => {

        if(! path){
            return;
        }

        console.log('Zoomed');

        var groupSelection = d3.select(markersGroup.current);

        let radius = 30  / props.zoom;

        if(30 < radius){
            radius = 30
        }

        const clicked = (event:any, d:any) => {
            console.log(d.properties);
        }

        const overlappingMarkers = ():number[] => {

            let markers:MarkerInterface[] = pois.map((poi)=>{

                const center = path.centroid( ( poi as Feature));

                const id = poi.id;
                const left = center[0] - radius;
                const right = center[0] + radius;
                const top = center[1] - radius;
                const bottom = center[1] + radius;

                return{
                    id,
                    left,
                    right,
                    top,
                    bottom,
                    overlap:[],
                };

            });

            markers = markers.map((markerA)=> {

                const overlap = markers.filter((markerB)=>{

                    if(markerA.id === markerB.id){
                        return false;
                    }

                     return !(markerB.left > markerA.right ||
                         markerB.right < markerA.left ||
                         markerB.top > markerA.bottom ||
                         markerB.bottom < markerA.top);

                });

                markerA.overlap = overlap.map((marker)=>{
                    return marker.id;
                });

                return markerA;

            });

            const markersThatOverlay:number[] = markers.filter((marker)=>{
                return (0 !== marker.overlap.length);
            }).map((marker)=>{
                return marker.id
            });


            return markersThatOverlay;

        }

        const markersThatOverlay = overlappingMarkers();

        groupSelection.selectAll('circle')
            .data(pois)
            .join('circle')
            .attr('cx', function(d) {
                return path.centroid( (d as Feature))[0];
            })
            .attr('cy', function(d) {
                return path.centroid( (d as Feature))[1];
            })
            .attr('fill', (d, i)=>{

                if(markersThatOverlay.includes(d.id)){
                    return 'red';
                }

                return 'blue';
            })
            .attr('r', radius)
            //.attr('opacity',0.5)

        /*
        groupSelection.selectAll('rect')
            .data(pois)
            .join('rect')
            .attr('x', function(d) {
                return path.centroid( (d as Feature))[0] - radius;
            })
            .attr('y', function(d) {
                return path.centroid( (d as Feature))[1] - radius;
            })
            .attr('fill', (d, i)=>{
                return 'green';
            })
            .attr('width', radius * 2)
            .attr('height', radius * 2)
            .attr('opacity',0.5)

         */

    });

    return (
        <g ref={markersGroup}></g>
    );

}
