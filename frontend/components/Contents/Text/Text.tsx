import React from 'react';
import {ContentPart} from "../Contents";
import Page from "../../Page/Page";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ReactMarkdown = require('react-markdown')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const gfm = require('remark-gfm')

export interface TextProps extends ContentPart{
    type: 'text',
    text: string;
}

export const Text = ({text}:TextProps) => {

    console.log(text)

    return (

        <ReactMarkdown plugins={[gfm]}>
            {text}
        </ReactMarkdown>

    );
}