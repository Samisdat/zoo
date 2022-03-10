import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {Icon} from 'components/Icon/Icon';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Component/Icon',
  component: Icon,
} as ComponentMeta<typeof Icon>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Icon> = (args) => <Icon {...args} />;

export const Utensils = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Utensils.args = {
  size: '2x',
  icon:'utensils'
};