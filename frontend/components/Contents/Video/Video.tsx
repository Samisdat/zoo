import React from 'react';
import {ContentPart} from "../Contents";
import {WrapImage} from "../Image/Image";

export interface VideoProps extends ContentPart{
    type: 'video',
    alternativeText: string,
    caption: string,
    copyright: string,
    url: string,
}

export const Video = ({alternativeText, caption, copyright,url}:VideoProps) => {

    return (
        <WrapImage
            align={'fullsize'}
        >

            <p>{alternativeText}</p>
            <p>{caption}</p>
            <p>{copyright}</p>
            <p>{url}</p>

        </WrapImage>
    );
}