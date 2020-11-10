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

export const XsSize = () => <IconSet size="xs" include={['chevronUp', 'chevronDown', 'disclosureRight']} />;

export const SmallSize = () => <IconSet size="s" exclude={['chevronUp', 'chevronDown']} />;

export const CustomColor = () => {
    const color = text('color', '#fc0');
    return <IconSet color={color} exclude={['chevronUp', 'chevronDown']} />;
};
