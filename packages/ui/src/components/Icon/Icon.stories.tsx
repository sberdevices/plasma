import React from 'react';
import { text } from '@storybook/addon-knobs';

import { IconSet } from './IconSet';

export default {
    title: 'Icon',
    decorators: [
        (Story) => (
            <div style={{ fontSize: '16px' }}>
                <Story />
            </div>
        ),
    ],
};

export const Default = () => <IconSet />;

export const Small = () => <IconSet size="s" />;

export const Large = () => <IconSet size="l" />;

export const CustomColor = () => {
    const color = text('color', '#fc0');
    return <IconSet color={color} />;
};
