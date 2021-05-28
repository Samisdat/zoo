import React, {useEffect} from 'react';
import * as d3 from 'd3';
import {MapElement} from "../../strapi-api/entity/map-element/map-element";

export interface PointOfInterestProperties{
    mapElements:MapElement[];
    pathGenerator:any;
    projection:any;
    zoom:number;
};

export const PointOfInterest = (props:PointOfInterestProperties) => {

    const svgId = 'main-svg';

    const positionId = 'poi-points';
    const clickId = 'poi-click';

    const pois = props.mapElements.filter((mapElement:MapElement) => {

        if('point' === mapElement.properties.type){
            return true;
        }

        return false;

    });

    useEffect(() => {

        if(undefined === props.pathGenerator){
            return;
        }

        var mapSvg = d3.select(`#${svgId}`)

        var positionGroup = mapSvg.select(`#${positionId}`);
        var clickGroup = mapSvg.select(`#${clickId}`);

        let radius = 8  / props.zoom;

        if(8 < radius){
            radius = 8
        }

        const clicked = (event:any, d:any) => {
            console.log(d.properties);
        }

        clickGroup.selectAll('circle')
            .data(pois)
            .join('circle')
            .attr('transform', function(d) { return 'translate(' + props.pathGenerator.centroid(d) + ')'; })
            .attr("id", (d:MapElement)=>{
                return d.properties.facility.slug;
            })
            .attr('fill', (d, i)=>{
                return 'blue';
            })
            .attr('d', props.pathGenerator)
            .attr('r', radius )
            .on("click", clicked)

        positionGroup.selectAll('circle')
            .data(pois)
            .join('circle')
            .attr('transform', function(d) { return 'translate(' + props.pathGenerator.centroid(d) + ')'; })
            .attr('fill', (d, i)=>{
                return 'red';
            })
            .attr('d', props.pathGenerator)
            .attr('r', radius *2.5)
            .attr('opacity', 3 )
            .on("click", clicked)
        ;

        /*
        positionGroup.selectAll("text")
            .data(pois)
            .enter()
            .append("text")
            .text((d:MapElementInterface) => {
                //console.log(d)
                return d.properties.facility.title;
            })
            .attr("x", (d:Feature) => {
                return props.projection(d.geometry.coordinates)[0] + 5;
            })
            .attr("y", (d:Feature) => {
                return props.projection(d.geometry.coordinates)[1] + 15;
            })
            .attr("class","labels");

         */

    });

    return (
        <g>
            <g id={positionId}></g>
            <g id={clickId}></g>
        </g>
    );

}
