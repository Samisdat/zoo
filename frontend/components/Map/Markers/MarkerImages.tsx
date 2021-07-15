import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {MapElement} from "../../../strapi-api/entity/map-element/map-element";
import {getImagePath} from "../../../helper/getImagePath";

export interface MarkerImagesProperties{
    mapElements:MapElement[];
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

export const MarkerImages = (props:MarkerImagesProperties) => {

    const markerImagesGroup = useRef(null);

    useEffect(() => {

        var groupSelection = d3.select(markerImagesGroup.current);

        groupSelection.selectAll('defs')
            .data(props.mapElements)
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


    });

    return (
        <g ref={markerImagesGroup} />
    );

}
