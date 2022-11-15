import React from 'react';

import {ContentPart} from "../Contents";
import Typography from "@mui/material/Typography";

export interface HeadlineProps extends ContentPart{
    type: 'headline',
    headline: string;
    level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Headline = ({headline, level}:HeadlineProps) => {

    return (
        <Typography variant={level} component={level} gutterBottom>
            {headline}
        </Typography>
    );

}

Headline.defaultProps = {
    type: 'headline'
};