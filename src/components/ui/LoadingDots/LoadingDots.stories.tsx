import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import LoadingDots from './';

export default {
  title: 'Components/UI/Loading Dots',
  component: LoadingDots,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    // layout: 'fullscreen',
  },
} as ComponentMeta<typeof LoadingDots>;

const Template: ComponentStory<typeof LoadingDots> = (args) => (
  <LoadingDots {...args} />
);

export const Basic = Template.bind({});
