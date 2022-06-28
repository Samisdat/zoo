import React from 'react';
import {MarkerImage} from './MarkerImage';
import {Facility} from "../../../../data/graphql/facility/facility";
import {Marker} from "../../../../data/graphql/marker/marker";

export interface MarkerImagesProps {
    markers: Marker[];
}

export const MarkerImages = ({markers}:MarkerImagesProps) => {

    const markersWithImage = markers.filter((marker)=>{

        if(marker.markerImage){
            return true;
        }

        return false;
    });

    return (
        <g>
            {
                markersWithImage.map((marker, i) => {
                    return (
                        <MarkerImage
                            key={i}
                            marker={marker}
                        />
                    );

                })
            }
        </g>
    );

}
