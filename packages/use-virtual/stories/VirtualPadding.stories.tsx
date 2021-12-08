import React from 'react';
import { Meta, Story } from '@storybook/react';

import { VirtualPadding } from './components/VirtualPadding';

const meta: Meta = {
    title: 'VirtualPadding',
    component: VirtualPadding,
};

export default meta;

const Template: Story = (args) => <VirtualPadding {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
