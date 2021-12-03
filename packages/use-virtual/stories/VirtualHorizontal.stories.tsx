import React from 'react';
import { Meta, Story } from '@storybook/react';
import { VirtualHorizontal } from './components/VirtualHorizontal';

const meta: Meta = {
  title: 'VirtualHorizontal',
  component: VirtualHorizontal,
};

export default meta;

const Template: Story = args => <VirtualHorizontal {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
