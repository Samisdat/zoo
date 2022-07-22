import React from 'react';
import {ContentImages} from "../../../data/graphql/post/content-map-data";

interface ImageProps{
    image:ContentImages;
}

export const Image = ({image}:ImageProps) => {

    console.log(image)

    return (
        <p>
            Image
        </p>

    );
}