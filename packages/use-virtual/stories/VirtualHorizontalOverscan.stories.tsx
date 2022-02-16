import React from 'react';
import { Meta, Story } from '@storybook/react';

import { VirtualHorizontalOverscan } from './components/VirtualHorizontalOverscan';

const meta: Meta = {
    title: 'VirtualHorizontalOverscan',
    component: VirtualHorizontalOverscan,
};

export default meta;

const Template: Story = (args) => <VirtualHorizontalOverscan {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
