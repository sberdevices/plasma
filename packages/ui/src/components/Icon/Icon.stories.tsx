import React from 'react';
import { text, select } from '@storybook/addon-knobs';

import { IconSet } from '../../helpers/IconSet';

export default {
    title: 'Icon',
};

export const Default = () => {
    const size = select('size', ['xs', 's', 'm', 'l', 'xl', 'xxl'], 's');

    return <IconSet size={size} />;
};

export const CustomColor = () => {
    const color = text('color', '#fc0');
    return <IconSet color={color} />;
};
