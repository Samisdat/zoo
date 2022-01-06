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

                return '#000';
            })
            .attr('stroke-width', (d, i)=>{
                return 1;
            })
            .attr('vector-effect', (d, i)=>{
                return 'non-scaling-stroke'
                return 1;
            })
            .attr('fill', (d, i)=>{

                return ("url(#"+d.contains[0].id + "-icon)");

            })
            .attr('r', props.radius)
            .on("click", handleClick);
        ;

        groupSelection.selectAll('path')
            .data(
                props.clusters.filter(
                    (cluster)=>{
                        return (1 < cluster.contains.length)
                    }
                ))

            .join('path')
            .attr('width', function(d) {
                return props.radius;
            })
            .attr('height', function(d) {
                return props.radius + 'px';
            })
            .attr("transform", (d) => {

                const scale = props.radius / 512;
                const x = path.centroid( (d.contains[0] as Feature))[0] + props.radius / 4;
                const y = path.centroid( (d.contains[0] as Feature))[1] + props.radius / 4;


                const transform = "translate(" + x + "," + y + ") scale(" + scale +  ")";

                return transform;

            })
            .attr('fill', (d, i)=>{

                return '#fff';

            })
            .attr('d', 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z')
        ;

    });

    return (
        <g ref={clusteredGroup} />
    );

}
