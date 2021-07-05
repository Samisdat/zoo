import React, {useEffect, useRef, useState} from 'react';
import * as d3 from 'd3';
import {MapElement} from "../../../strapi-api/entity/map-element/map-element";
import {useMap} from "../Context/MapContext";
import {Feature} from "geojson";
import {getImagePath} from "../../../helper/getImagePath";
import {GeoPath} from "d3";
import {MarkerImages} from "./MarkerImages";

export interface ClusteredMarkersProperties{
    clusters:ClusterInterface[];
    zoom:number;
};

interface ClusterInterface{
    ids: number[],
    contains: MapElement[];
    remove: boolean;
}

export const ClusteredMarkers = (props:ClusteredMarkersProperties) => {

    const {
        state: {path},
    } = useMap();

    const maxRadius = 30;

    const clusteredGroup = useRef(null);

    useEffect(() => {

        if(! path){
            return;
        }

        let radius = maxRadius  / props.zoom;

        if(maxRadius < radius){
            radius = maxRadius;
        }

        let stroke = 2  / props.zoom;

        if(2 < stroke){
            stroke = 2;
        }

        console.log(stroke);

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
            .attr('fill', (d, i)=>{

                return ("url(#"+d.contains[0].id + "-icon)");

                return 'blue';
            })
            .attr('r', radius)

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
                return d.contains[0].id;
                return d.contains.length
            })
            .attr('fill', (d, i)=>{

                //return ("url(#"+d.contains[0].id + "-icon)");

                return 'white';
            })
            .attr('width', radius/1.5)
            .attr('height', radius/1.5)
            .attr('font-size', radius/1.5)


    });

    return (
        <g ref={clusteredGroup} />
    );

}
