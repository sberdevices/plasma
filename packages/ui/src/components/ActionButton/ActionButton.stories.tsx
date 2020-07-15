import React from 'react';

import Story from '../../helpers/Story';

import { ActionButton } from './ActionButton';

export default {
    title: 'ActionButton',
};

export const Default = () => (
    <Story>
        <ActionButton />
    </Story>
);

export const SizeSmall = () => (
    <Story>
        <ActionButton size="s" />
    </Story>
);

export const SizeLarge = () => (
    <Story>
        <ActionButton size="l" />
    </Story>
);
