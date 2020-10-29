import React from 'react';
import { text, select } from '@storybook/addon-knobs';

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

export const Default = () => <Badge text={text('text', 'Badge')} />;

export const Sizes = () => <Badge text={text('text', 'Badge')} size={select('size', sizeKeys, 'l')} />;

export const Views = () => <Badge text={text('text', 'Badge')} view={select('view', viewKeys, 'primary')} />;

export const WithIconInLeft = () => (
    <Badge text={text('text', 'Badge')} contentLeft={<Icon icon="assistant" size="s" />} />
);

export const WithIconInRight = () => (
    <Badge text={text('text', 'Badge')} contentRight={<Icon icon="assistant" size="s" />} />
);

export const NoText = () => <Badge contentLeft={<Icon icon="assistant" size="s" />} />;
