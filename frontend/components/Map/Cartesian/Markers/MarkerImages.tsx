import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {getImagePath} from "../../../helper/getImagePath";
import {Facility} from "../../../strapi-api/entity/facility/facility";

export interface MarkerImagesProperties{
    facilities: Facility[];
};

const getImage = (facility:Facility) => {

    if(!facility){
        return undefined;
    }

    let image:string = undefined;

    if(0 !== facility.photos.length && undefined !== facility.photos[0] && facility.photos[0].thumbnail){
        image = getImagePath(facility.photos[0].thumbnail.src);
    }

    if(undefined === image){

        const animalWithImage = facility.animals.find((animal)=>{
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

export const MarkerImages = ({facilities}:MarkerImagesProperties) => {

    const markerImagesGroup = useRef(null);

    const facilitiesWithImages = facilities.filter((facility)=>{
        return (0 !== facility.photos.length)
    });

    useEffect(() => {

        var groupSelection = d3.select(markerImagesGroup.current);

        groupSelection.selectAll('defs')
            .data(facilitiesWithImages)
            .join("defs")
            .append('pattern')
            .attr('id', function(d) { return (`icon-${d.slug}`);}) // just create a unique id (id comes from the json)
            .attr('width', 1)
            .attr('height', 1)
            .attr('patternContentUnits', 'objectBoundingBox')
            .append("image")
            .attr("xlink:href", (facility:Facility)=>{
                return getImage(facility);
            })
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", 1)
            .attr("width", 1)
            .attr("preserveAspectRatio", "xMinYMin slice");


    },[]);

    return (
        <g ref={markerImagesGroup} />
    );

}
