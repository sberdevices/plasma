import React from 'react';
import { text, boolean, select } from '@storybook/addon-knobs';
import { IconSettings } from '@sberdevices/plasma-icons';
import { View, views } from '@sberdevices/plasma-core/mixins';

import { Badge, badgeSizes, BadgeSize } from './Badge';

const sizeKeys = Object.keys(badgeSizes) as BadgeSize[];
const viewKeys = Object.keys(views) as View[];

export const Default = () => (
    <Badge
        text={text('text', 'Badge')}
        size={select('size', sizeKeys, 'l')}
        view={select('view', viewKeys, 'primary')}
        contentLeft={boolean('Enable icon', false) && <IconSettings color="inherit" size="xs" />}
    />
);

export const Quantity = () => (
    <Badge
        text={text('quantity', '11')}
        size={select('size', sizeKeys, 's')}
        view={select('view', viewKeys, 'accent')}
        circled={boolean('circled', true)}
    />
);
