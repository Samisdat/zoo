import React from 'react';
import {ContentPart} from "../Contents";
import Page from "../../Page/Page";
import {styled} from "@mui/material/styles";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ReactMarkdown = require('react-markdown')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const gfm = require('remark-gfm')

const StyledText = styled('div')(({ theme }) => ({

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

    return (
        <StyledText>
            <ReactMarkdown plugins={[gfm]}>
                {text}
            </ReactMarkdown>
        </StyledText>
    );
}