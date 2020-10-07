import React from 'react';
import { text, select } from '@storybook/addon-knobs';

import { Badge, badgeSizes, badgeViewsToColors } from './Badge';
import { Icon } from '../Icon/Icon';

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

const sizes = Object.keys(badgeSizes);
const views = Object.keys(badgeViewsToColors);

export const Default = () => (
    <Badge text={text('text', 'Badge')} />
);

export const Sizes = () => (
    <Badge text={text('text', 'Badge')} size={select('size', sizes, 'l')} />
);

export const Views = () => (
    <Badge text={text('text', 'Badge')} view={select('view', views, 'primary')} />
);

export const WithIconInLeft = () => (
    <Badge
        text={text('text', 'Badge')}
        contentLeft={<Icon icon="assistant" size="s" />}
    />
);

export const WithIconInRight = () => (
    <Badge
        text={text('text', 'Badge')}
        contentRight={<Icon icon="assistant" size="s" />}
    />
);

export const NoText = () => (
    <Badge contentLeft={<Icon icon="assistant" size="s" />} />
);
