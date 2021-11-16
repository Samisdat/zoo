import React, {useEffect, useRef, useState} from 'react';
import * as d3 from 'd3';
import {MapElement} from "../../../strapi-api/entity/map-element/map-element";
import {useMap} from "../Context/MapContext";
import {Feature} from "geojson";

export interface ClusteredMarkersProperties{
    clusters:ClusterInterface[];
    radius:number;
};

interface ClusterInterface{
    ids: number[],
    contains: MapElement[];
    remove: boolean;
}

export const ClusteredMarkers = (props:ClusteredMarkersProperties) => {

    const {
        state: {path},
        dispatch
    } = useMap();

    const clusteredGroup = useRef(null);

    const handleClick = (event, d) => {

        if(1 === d.contains.length){

            const clickedMapElement = d.contains[0];
            
            dispatch({
                type: 'SET_TEASER',
                teaser: clickedMapElement
            });

            return;
        }

        dispatch({
            type: 'SET_ZOOM_AND_PAN',
            center: d.contains,
        });

    }

    useEffect(() => {

        if(! path){
            return;
        }

        const groupSelection = d3.select(clusteredGroup.current);
        
        groupSelection.selectAll('circle')
            .data(props.clusters)
            .join('circle')
            .attr('cx', function(d) {
                return path.centroid( (d.contains[0] as Feature))[0];
            })
            .attr('cy', function(d) {
                return path.centroid( (d.contains[0] as Feature))[1];
            })
            .attr('stroke', (d, i)=>{

                return 'red';
            })
            .attr('stroke-width', (d, i)=>{
                return 2;
            })
            .attr('vector-effect', (d, i)=>{
                return 'non-scaling-stroke'
                return 1;
            })
            .attr('fill', (d, i)=>{

                return ("url(#"+d.contains[0].id + "-icon)");

                return 'blue';
            })
            .attr('r', props.radius)
            .on("click", handleClick);
        ;

        groupSelection.selectAll('text')
            .data(props.clusters)
            .join('text')
            .attr('x', function(d) {
                return path.centroid( (d.contains[0] as Feature))[0];
            })
            .attr('y', function(d) {
                return path.centroid( (d.contains[0] as Feature))[1];
            })
            .text((d) => {
                //return d.contains[0].id;
                return d.contains.length
            })
            .attr('fill', (d, i)=>{

                //return ("url(#"+d.contains[0].id + "-icon)");

                return 'white';
            })
            .attr('width', props.radius/1.5)
            .attr('height', props.radius/1.5)
            .attr('font-size', props.radius/1.5)


    });

    return (
        <g ref={clusteredGroup} />
    );

}
