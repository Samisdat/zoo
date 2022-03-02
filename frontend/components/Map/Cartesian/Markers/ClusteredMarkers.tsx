import React, {useEffect, useRef, useState} from 'react';
import * as d3 from 'd3';
import {useMap} from "../../Context/MapContext";
import {Marker} from "strapi-api/entity/marker/marker";
import {angle} from "../../../../constants";

export interface ClusteredMarkersProperties{
    clusters:ClusterInterface[];
    radius:number;
};

interface ClusterInterface{
    ids: number[],
    contains: Marker[];
    remove: boolean;
}

export const ClusteredMarkers = (props:ClusteredMarkersProperties) => {

    const {
        state: {path},
        dispatch
    } = useMap();

    const clusteredGroup = useRef(null);

    const handleClick = (event, d:ClusterInterface) => {

        if(1 === d.contains.length){

            const clicked = d.contains[0];

            dispatch({
                type: 'SET_TEASER',
                teaser: clicked.facility
            });

            return;
        }

        console.log('zoom and center to d.contains')

        const slugs = d.contains.map((marker)=>{
            return marker.slug;
        })

        dispatch({
            type: 'SET_ZOOM_AND_PAN',
            center: slugs,
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
                return d.contains[0].x;
            })
            .attr('cy', function(d) {
                return d.contains[0].y;
            })
            .attr("transform", (d)=>{

                return `rotate(${angle} ${d.contains[0].x} ${d.contains[0].y})`;

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

                return (`url(#icon-${d.contains[0].facility?.slug})`);

            })
            .attr('r', props.radius)
            .on("click", handleClick)
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

                const x = d.contains[0].x + props.radius / 4;
                const y = d.contains[0].y + props.radius / 4;

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
