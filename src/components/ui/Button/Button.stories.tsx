import type { Meta, StoryObj } from '@storybook/react';

import Button from './';

type Story = StoryObj<typeof meta>;

const meta: Meta<typeof Button> = {
  title: 'Components/UI/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: {
      description: 'Copy to display',
      table: {
        type: { summary: 'string' },
      },
      control: {
        type: 'text',
      },
    },
    level: {
      description: 'Visual importance level',
      control: {
        type: 'select',
      },
    },
    loadingCopy: {
      description: 'Copy to display when in the "loading" state',
      table: {
        defaultValue: { summary: 'undefined' },
      },
      control: {
        type: 'text',
      },
    },
    Component: {
      description: 'Type of control to display',
      control: {
        type: undefined,
      },
    },
    href: {
      description: 'Destination if a "Link" is used',
      table: {
        defaultValue: { summary: 'undefined' },
      },
      control: {
        type: 'text',
      },
    },
    loading: {
      description: 'Toggle loading state',
      table: {
        defaultValue: { summary: 'false' },
      },
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    children: 'Click me!',
    level: 'primary',
  },
};
