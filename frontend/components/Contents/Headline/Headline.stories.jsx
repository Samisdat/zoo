import React from 'react';
import {Headline} from "./Headline";

export default {
    title: 'Content/Headline',
    component: Headline,
    argTypes:{
        type: {
            table: {
                disable: true
            }
        }
    }
};

const Template = (args) => <Headline {...args} />;

export const Fullsize = Template.bind({});

Fullsize.args = {
    level:'h1',
    headline:'Lorem ipsum'
};
