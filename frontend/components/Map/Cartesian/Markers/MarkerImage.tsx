import React from 'react';
import {Marker} from "../../../../data/graphql/marker/marker";

export interface MarkerImageProps {
    marker: Marker;
}

export const MarkerImage = ({marker}:MarkerImageProps) => {

    return (
        <defs>
            <pattern
                id={`icon-${marker.slug}`}
                width={1}
                height={1}
                patternContentUnits={'objectBoundingBox'}
            >
                <image
                    href={marker.markerImage}
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
