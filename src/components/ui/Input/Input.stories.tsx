import type { Meta, StoryObj } from '@storybook/react';

import Input from './';

type Story = StoryObj<typeof meta>;

const meta: Meta<typeof Input> = {
  title: 'Components/UI/Input',
  component: Input,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: {
      description: 'Input label copy',
      table: {
        type: { summary: 'string' },
      },
      control: {
        type: 'text',
      },
    },
  },
};

export default meta;

export const Default: Story = {
  args: {},
};
