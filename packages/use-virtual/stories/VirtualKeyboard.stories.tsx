import React from 'react';
import { Meta, Story } from '@storybook/react';
import { VirtualKeyboard } from './components/VirtualKeyboard';

const meta: Meta = {
  title: 'VirtualKeyboard',
  component: VirtualKeyboard,
};

export default meta;

const Template: Story = args => <VirtualKeyboard {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
