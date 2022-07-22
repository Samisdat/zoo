import React from 'react';
import {ContentText} from "../../../data/graphql/post/content-map-data";

interface TextProps{
    text:ContentText;
}

export const Text = ({text}:TextProps) => {

    console.log(text)

    return (
        <p>
            Text
        </p>

    );
}