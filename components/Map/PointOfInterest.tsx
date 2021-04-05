import React, {useEffect} from 'react';
import * as d3 from 'd3';
import {Feature} from "geojson";
import {MapElementInterface} from "../../data-api/map-elements";

export interface PointOfInterestProperties{
    mapElements:MapElementInterface[];
    pathGenerator:any;
    projection:any;
    zoom:number;
};

export const PointOfInterest = (props:PointOfInterestProperties) => {

    const svgId = 'main-svg';

    const positionId = 'poi-points';
    const clickId = 'poi-click';

    const pois = props.mapElements.filter((mapElement:MapElementInterface) => {

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
            .attr('opacity', 0 )
            .on("click", clicked)
        ;

        /*
        positionGroup.selectAll("text")
            .data(pois)
            .enter()
            .append("text")
            .text((d:Feature) => {
                //console.log(d)
                return d.properties.name;
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
