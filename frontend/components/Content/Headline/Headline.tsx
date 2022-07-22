import React from 'react';
import {ContentHeadline} from "../../../data/graphql/post/content-map-data";

interface HeadlineProps{
    headline:ContentHeadline;
}

export const Headline = ({headline}:HeadlineProps) => {

    console.log(headline)

    return (
        <p>
            Headline
        </p>

    );
}