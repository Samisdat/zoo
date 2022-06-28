import React from 'react';
import {Marker} from "../../../../data/graphql/marker/marker";

export interface MarkerImageProps {
    facility: Facility;
}

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

export const MarkerImage = ({facility}:MarkerImageProps) => {

    return (
        <defs>
            <pattern
                id={`icon-${facility.slug}`}
                width={1}
                height={1}
                patternContentUnits={'objectBoundingBox'}
            >
                <image
                    href={getImage(facility)}
                    x={0}
                    y={0}
                    height={1}
                    width={1}
                    preserveAspectRatio={'xMinYMin slice'}
                />
            </pattern>
        </defs>
    );
}
