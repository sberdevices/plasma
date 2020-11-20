import React from 'react';
import { text, boolean, select } from '@storybook/addon-knobs';

import { View, views } from '../../mixins/applyView';
import { IconSettings } from '../Icon';

import { Badge, badgeSizes, BadgeSize } from './Badge';

export default {
    title: 'Badge',
    component: Badge,
    decorators: [
        (Story) => (
            <div style={{ display: 'flex' }}>
                <Story />
            </div>
        ),
    ],
};

const sizeKeys = Object.keys(badgeSizes) as BadgeSize[];
const viewKeys = Object.keys(views) as View[];

export const Default = () => (
    <Badge
        text={text('text', 'Badge')}
        size={select('size', sizeKeys, 'l')}
        view={select('view', viewKeys, 'primary')}
        contentLeft={boolean('Enable icon', false) && <IconSettings size="xs" />}
    />
);

export const Quantity = () => (
    <Badge
        text={text('text', '11')}
        size={select('size', sizeKeys, 's')}
        view={select('view', viewKeys, 'accent')}
        circled={boolean('circled', true)}
    />
);
