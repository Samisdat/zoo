import React from 'react';
import {ContentPart} from "../Contents";
import {PhotoJson} from "../../../data/graphql/photo/photo-json";
import {Image} from "../Image/Image";

export interface ImagesProps extends ContentPart{
    type: 'images',
    images: PhotoJson[];
}

export const Images = ({images}:ImagesProps) => {

    return (
        <>
            {images.map((image:PhotoJson, index) => (
                <Image
                    type={'image'}
                    image={image}
                    align={'none'}
                />
            ))}
        </>
    );
}