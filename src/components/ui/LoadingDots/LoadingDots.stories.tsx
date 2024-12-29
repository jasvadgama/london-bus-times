import type { Meta, StoryObj } from '@storybook/react';

import LoadingDots from './';

type Story = StoryObj<typeof meta>;

const meta: Meta<typeof LoadingDots> = {
  title: 'Components/UI/Loading Dots',
  component: LoadingDots,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    // layout: 'fullscreen',
  },
};

export default meta;

export const Default: Story = {
  args: {},
};
