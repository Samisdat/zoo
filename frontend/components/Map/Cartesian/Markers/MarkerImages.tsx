import React from 'react';
import {Facility} from 'strapi-api/entity/facility/facility';
import {MarkerImage} from './MarkerImage';

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
