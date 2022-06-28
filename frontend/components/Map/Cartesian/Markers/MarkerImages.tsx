import React from 'react';
import {MarkerImage} from './MarkerImage';
import {Facility} from "../../../../data/graphql/facility/facility";
import {Marker} from "../../../../data/graphql/marker/marker";

export interface MarkerImagesProps {
    facilities: Facility[];
}

export const MarkerImages = ({facilities}:MarkerImagesProps) => {

    const facilitiesWithImages = facilities.filter((facility)=>{
        return (0 !== facility.photos.length)
    });

    return (
        <g>
            {
                facilitiesWithImages.map((facility, i) => {
                    return (
                        <MarkerImage
                            key={i}
                            facility={facility}
                        />
                    );

                })
            }
        </g>
    );

}
