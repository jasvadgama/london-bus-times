import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import Button from './';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
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
        type: null,
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
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Basic = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Basic.args = {
  children: 'Find stop',
  level: 'primary',
  loadingCopy: 'Searching',
};
