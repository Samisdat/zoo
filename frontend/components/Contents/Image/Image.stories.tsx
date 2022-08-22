import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {Image} from "./Image";

export default {
    title: 'Content/Image',
    component: Image,
    argTypes:{
        type: {
            table: {
                disable: true
            }
        }
    }
} as ComponentMeta<typeof Image>;

const Template: ComponentStory<typeof Image> = (args) => <Image {...args} />;

export const Fullsize = Template.bind({});

Fullsize.decorators = [
    (Story) => (
        <React.Fragment>
            {Story()}
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
        </React.Fragment>
    ),
];

Fullsize.args = {

    image: {
        "id": 98,
        "title": "Eselspinguin-mit-Kueken-006-29.06.22.jpg",
        "copyright": "Claudia Philipp",
        "thumbnail": {
            "width": 234,
            "height": 156,
            "src": "/uploads/thumbnail_Eselspinguin_mit_Kueken_006_29_06_22_bedd2a89e4.jpg"
        },
        "small": {
            "width": 500,
            "height": 333,
            "src": "/uploads/small_Eselspinguin_mit_Kueken_006_29_06_22_bedd2a89e4.jpg"
        },
        "medium": {
            "width": 750,
            "height": 500,
            "src": "/uploads/medium_Eselspinguin_mit_Kueken_006_29_06_22_bedd2a89e4.jpg"
        },
        "large": {
            "width": 1000,
            "height": 667,
            "src": "/uploads/large_Eselspinguin_mit_Kueken_006_29_06_22_bedd2a89e4.jpg"
        },
        "focalPoint": {
            "x": 50,
            "y": 50
        }
    },
    align: 'fullsize',
};
