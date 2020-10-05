import React from 'react';

import { ActionButton } from './ActionButton';

export default {
    title: 'ActionButton',
};

export const Default = () => <ActionButton />;

export const SizeSmall = () => <ActionButton size="s" />;

export const SizeLarge = () => <ActionButton size="l" />;
