import React from 'react';

import {ContentPart} from "../Contents";

export interface HeadlineProps extends ContentPart{
    type: 'headline',
    headline: string;
    level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Headline = ({headline, level}:HeadlineProps) => {

    console.log(headline,level);

    return (
        <p>
            Headline
        </p>

    );
}