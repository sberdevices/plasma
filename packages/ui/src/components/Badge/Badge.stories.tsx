import React from 'react';
import { text, boolean, select } from '@storybook/addon-knobs';

import { View, views } from '../../mixins/applyView';
import { Icon } from '../Icon/Icon';

import { Badge, badgeSizes, BadgeSize } from './Badge';

export default {
    title: 'Badge',
    component: Badge,
    decorators: [
        (Story) => (
            <div style={{ display: 'flex', padding: '40px' }}>
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
        contentLeft={boolean('contentLeft', false) && <Icon icon="assistant" size="s" />}
    />
);

export const Quantity = () => <Badge text={text('text', '#')} size="s" view="primary" />;
