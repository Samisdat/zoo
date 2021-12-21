import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {Endanger} from "../../components/Animal/Endanger";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Component/Endanger',
  component: Endanger,
} as ComponentMeta<typeof Endanger>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Endanger> = (args) => <Endanger {...args} />;

export const Extinct = Template.bind({});
Extinct.args = {
  iucnStatus:'EX'
};

export const ExtinctInTheWild = Template.bind({});
ExtinctInTheWild.args = {
  iucnStatus:'EW'
};

export const CriticallyEndangered = Template.bind({});
CriticallyEndangered.args = {
  iucnStatus:'CR'
};

export const Endangered = Template.bind({});
Endangered.args = {
  iucnStatus:'EN'
};

export const Vulnerable = Template.bind({});
Vulnerable.args = {
  iucnStatus:'VU'
};

export const NearThreatened = Template.bind({});
NearThreatened.args = {
  iucnStatus:'NT'
};

export const LeastConcern = Template.bind({});
LeastConcern.args = {
  iucnStatus:'LC'
};

export const DataDeficient = Template.bind({});
DataDeficient.args = {
  iucnStatus:'DD'
};
