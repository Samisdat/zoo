import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {MapElement} from "../../strapi-api/entity/map-element/map-element";
import {useMap} from "./Context/MapContext";

export interface PointOfInterestProperties{
    mapElements:MapElement[];
    zoom:number;
};

export const PointOfInterest = (props:PointOfInterestProperties) => {

    const {
        state: {path},
    } = useMap();

    const pointsGroup = useRef(null);
    const clickGroup = useRef(null);

    const pois = props.mapElements.filter((mapElement:MapElement) => {

        if('point' === mapElement.properties.type){
            return true;
        }

        return false;

    });

    useEffect(() => {

        if(! path){
            return;
        }

        var positionGroupSelection = d3.select(pointsGroup.current);
        var clickGroupSelection = d3.select(clickGroup.current);

        let radius = 8  / props.zoom;

        if(8 < radius){
            radius = 8
        }

        const clicked = (event:any, d:any) => {
            console.log(d.properties);
        }

        clickGroupSelection.selectAll('circle')
            .data(pois)
            .join('circle')
            .attr('transform', function(d) { return 'translate(' + path.centroid(d) + ')'; })
            .attr("id", (d:MapElement)=>{
                return d.properties.facility.slug;
            })
            .attr('fill', (d, i)=>{
                return 'blue';
            })
            .attr('d', path)
            .attr('r', radius )
            .on("click", clicked)

        positionGroupSelection.selectAll('circle')
            .data(pois)
            .join('circle')
            .attr('transform', function(d) { return 'translate(' + path.centroid(d) + ')'; })
            .attr('fill', (d, i)=>{
                return 'red';
            })
            .attr('d', path)
            .attr('r', radius *2.5)
            .attr('opacity', 3 )
            .on("click", clicked)
        ;

    });

    return (
        <g>
            <g ref={pointsGroup}></g>
            <g ref={clickGroup}></g>
        </g>
    );

}
