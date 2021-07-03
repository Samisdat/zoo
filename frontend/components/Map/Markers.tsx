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

interface PointInterface{
    id:number;
    x:number;
    y:number;
    overlap:number[];
}

interface ClusterInterface{
    ids:number[],
    contains:MapElement[];
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

    const subset = [
        413,
        412,
        415,
        414,
        462,
        410
    ]

    let pois2 = pois.filter((poi)=>{

        return subset.includes(poi.id);

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

        const overlappingMarkers = ():any[] => {

            let markers:PointInterface[] = pois.map((poi)=>{

                const center = path.centroid( ( poi as Feature));

                const id = poi.id;
                const x = center[0];
                const y = center[1];

                return{
                    id,
                    x,
                    y,
                    overlap:[],
                };

            });

            markers = markers.map((markerA)=> {

                const overlap = markers.filter((markerB)=>{

                    if(markerA.id === markerB.id){
                        return false;
                    }

                    const catheti = [
                        markerB.x - markerA.x,
                        markerB.y - markerA.y
                    ];

                    const hypotenuse = Math.sqrt(
                        Math.pow(catheti[0], 2) +
                        Math.pow(catheti[1], 2)
                    );

                    if((radius * 2) > hypotenuse){
                        return true;
                    }

                    return false;

                });

                markerA.overlap = overlap.map((marker)=>{
                    return marker.id;
                });

                return markerA;

            });

            const clustered = markers.reduce((accumulator, currentValue) => {

                const ids = [currentValue.id].concat(currentValue.overlap);

                const findAlreadyInAnCluster = accumulator.filter((previous)=>{

                    var intersect = ids.filter(function(n) {
                        return (true === previous.ids.includes(n));
                    });

                    console.log('previous', previous, ids, intersect);

                    return (0 !== intersect.length);
                });

                const alreadyInAnCluster = (0 !== findAlreadyInAnCluster.length);

                console.log('alreadyInAnCluster', alreadyInAnCluster);

                // is not overlapping with any other marker: A "cluster" on it's own
                if(!alreadyInAnCluster){

                    const mapElements = pois.filter((poi)=>{
                        return (ids.includes(poi.id));
                    });

                    const cluster:ClusterInterface = {
                        ids,
                        contains:mapElements
                    }

                    accumulator.push(cluster);

                }
                // add to an existing cluster
                else{

                    var missing = ids.filter(function(n) {
                        return (false === findAlreadyInAnCluster[0].ids.includes(n));
                    });

                    if(0 !== missing.length){

                        for(const missingId of missing){
                            console.log(missingId)

                            const mapElement = pois.find((poi)=>{
                                return (ids.includes(poi.id));
                            })

                            findAlreadyInAnCluster[0].ids.push(missingId);
                            findAlreadyInAnCluster[0].contains.push(mapElement);

                        }

                    }

                    console.log('add to an existing cluster', findAlreadyInAnCluster[0].ids, ids, missing);


                }
                // create on new cluster

                return accumulator

                if(0 === currentValue.overlap.length){

                    const mapElement = pois.find((poi)=>{
                        return (poi.id === currentValue.id);
                    })

                    const cluster:ClusterInterface = {
                        ids: [currentValue.id],
                        contains:[mapElement]
                    }

                    accumulator.push(cluster);
                }
                else{

                    //console.log([currentValue.id].concat(currentValue.overlap), currentValue.overlap)

                }

                return accumulator;
            }, []);

            for(const cluster of clustered){
                console.log(cluster.ids)
            }


            const markersThatOverlay:number[] = markers.filter((marker)=>{
                return (0 !== marker.overlap.length);
            }).map((marker)=>{
                return marker.id
            });


            return clustered;

        }

        const markersThatOverlay = overlappingMarkers();
        console.log(markersThatOverlay)
        groupSelection.selectAll('circle')
            .data(markersThatOverlay)
            .join('circle')
            .attr('cx', function(d) {
                return path.centroid( (d.contains[0] as Feature))[0];
            })
            .attr('cy', function(d) {
                return path.centroid( (d.contains[0] as Feature))[1];
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


        groupSelection.selectAll('text')
            .data(pois)
            .join('text')
            .attr('x', function(d) {
                return path.centroid( (d as Feature))[0];
            })
            .attr('y', function(d) {
                return path.centroid( (d as Feature))[1];
            })
            .text(function(d){return d.id})
        //.attr('opacity',0.5)
        */

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
