import React from 'react';
import {ContentPart} from "../Contents";
import {WrapImage} from "../Image/Image";

export interface YoutubeProps extends ContentPart{
    type: 'youtube',
    youtubeUrl: string;
    caption: string;
}

export const Youtube = ({youtubeUrl, caption}:YoutubeProps) => {

    return (
        <WrapImage
            align={'fullsize'}
        >
            {youtubeUrl}
            {caption}
        </WrapImage>
    );
}