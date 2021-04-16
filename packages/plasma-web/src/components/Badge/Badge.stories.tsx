import React from 'react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { IconSettings } from '@sberdevices/plasma-icons';

import { Badge, badgeSizes, badgeViews, BadgeSize, BadgeView } from '.';

const sizeKeys = Object.keys(badgeSizes) as BadgeSize[];
const viewKeys = Object.keys(badgeViews) as BadgeView[];

export const Default = () => (
    <Badge
        text={text('text', 'Badge')}
        size={select('size', sizeKeys, 'l')}
        view={select('view', viewKeys, 'primary')}
        contentLeft={boolean('Enable icon', false) && <IconSettings color="inherit" size="xs" />}
    />
);
