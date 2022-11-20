import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import ButtonComponent  from "./Button";

export default {
    title: 'Foo',
    component: ButtonComponent,
} as ComponentMeta<typeof ButtonComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/int
const Template: ComponentStory<typeof ButtonComponent> = (args) => <ButtonComponent {...args} />;

export const Button = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Button.args = {
    children: 'Lorem Ipsum',
};


