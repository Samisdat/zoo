import React from 'react';
import {ContentPart} from "../Contents";
import {PhotoJson} from "../../../data/graphql/photo/photo-json";
import {Image} from "../Image/Image";
import Grid from "@mui/material/Grid";

export interface ImagesProps extends ContentPart{
    type: 'images',
    images: PhotoJson[];
}


export const Images = ({images}:ImagesProps) => {

    return (
            <Grid
                container
                spacing={2}
            >
                {images.map((image:PhotoJson, index) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        key={index}
                    >
                        <div>
                            <Image
                                type={'image'}
                                image={image}
                                align={'none'}
                            />
                        </div>
                    </Grid>

                ))}
            </Grid>
    );
}