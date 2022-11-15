import React from 'react';
import {ContentPart} from "../Contents";
import Page from "../../Page/Page";
import {styled} from "@mui/material/styles";
import {Images} from "../Images/Images";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ReactMarkdown = require('react-markdown')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const gfm = require('remark-gfm')

const StyledText = styled('div')(({ theme }) => ({
    '& p': {
        fontSize: theme.typography.body1.fontSize,
    },
    '& a': {
        fontWeight: 'bold',
        textDecoration: 'none',
        color: theme.palette.primary.main,
        ':hover':{
            textDecoration: 'underline',
        }
    },
}));

export interface TextProps extends ContentPart{
    type: 'text',
    text: string;
}

export const Text = ({text}:TextProps) => {

    console.log(text);

    return (
        <StyledText>
            <ReactMarkdown plugins={[gfm]}>
                {text}
            </ReactMarkdown>
        </StyledText>
    );
}

Text.defaultProps = {
    type: 'text'
};