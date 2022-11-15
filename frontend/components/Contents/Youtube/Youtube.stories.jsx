import React from 'react';
import {Youtube} from "./Youtube";


export default {
    title: 'Content/Youtube',
    component: Youtube,
    argTypes:{
        type: {
            table: {
                disable: true
            }
        }
    }
};

const Template = (args) => <Youtube {...args} />;

export const Fullsize = Template.bind({});

Fullsize.args = {
    youtubeUrl: 'https://www.youtube.com/watch?v=oE3uDdciBoA&t=2s',
    caption:'Video: Zoo Zürich, Nicole Schnyder'
};
