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

const getImage = (mapElement:MapElement) => {

    const  facilitiy = mapElement.facility;

    if(!facilitiy){
        return undefined;
    }

    let image:string = undefined;

    if(0 !== facilitiy.photos.length && undefined !== facilitiy.photos[0] && facilitiy.photos[0].thumbnail){
        image = getImagePath(facilitiy.photos[0].thumbnail.src);
    }

    if(undefined === image){

        const animalWithImage = facilitiy.animals.find((animal)=>{
            return (0 < animal.photos.length);
        });

        if(undefined !== animalWithImage){

            if(0 !== animalWithImage.photos.length && undefined !== animalWithImage.photos[0] && animalWithImage.photos[0].thumbnail){
                image = getImagePath(animalWithImage.photos[0].thumbnail.src);
            }

        }

    }

    return image;

}


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
        /*
        for(const poi of pois){

            console.log(getImage(poi));

        }
        */
        /*
        clickGroupSelection.selectAll('circle')
            .data(pois)
            .join('circle')
            .attr('transform', function(d) { return 'translate(' + path.centroid( (d as Feature)) + ')'; })
            .attr("id", (d:MapElement)=>{
                return d.properties.facility.slug;
            })
            .attr('fill', (d, i)=>{
                return 'blue';
            })
            .attr('d', path as any)
            .attr('r', radius )
            .on("click", clicked)
        */
        positionGroupSelection.selectAll('circle')
            .data(pois)
            .join('circle')
            .attr('transform', function(d) { return 'translate(' + path.centroid(d as Feature) + ')'; })
            .attr('fill', (d, i)=>{
                return 'red';
            })
            .attr('d', path as any)
            .attr('r', radius * 3   )
            .attr('opacity', 3 )
            .attr("title", (d:MapElement)=>{
                return getImage(d);
            })
            .on("click", clicked)
        ;
        /*
        positionGroupSelection.selectAll('defs')
            .data(pois)
            .join("defs")
            .append('pattern')
            .attr('id', function(d) { return (d.id + '-icon');}) // just create a unique id (id comes from the json)
            .attr('width', 1)
            .attr('height', 1)
            .attr('patternContentUnits', 'objectBoundingBox')
                .append("image")
                .attr("xlink:href", (d:MapElement)=>{
                    return getImage(d);
                })
                .attr("x", 0)
                .attr("y", 0)
                .attr("height", 1)
                .attr("width", 1)
            .attr("preserveAspectRatio", "xMinYMin slice");

        ;

        positionGroupSelection.selectAll('circle')
            .data(pois)
            .join('circle')
            .attr('transform', function(d) { return 'translate(' + path.centroid(d as Feature) + ')'; })
            .attr('fill', (d, i)=>{
                return ("url(#"+d.id + "-icon)");
            })
            .attr('d', path as any)
            .attr('r', radius *2.5)
            .attr('opacity', 3 )

            .on("click", clicked)
        ;


        /*
        positionGroupSelection.selectAll('image')
            .data(pois)
            .join("image")
            .attr("xlink:href", (d:MapElement)=>{
                return getImage(d);
            })
            .attr('transform', function(d) { return 'translate(' + path.centroid(d as Feature) + ')'; })
            .attr("width", "20")
            .attr("height", "20");
        ;

         */


    });

    return (
        <g>
            <g ref={pointsGroup}></g>
            <g ref={clickGroup}></g>
        </g>
    );

}
