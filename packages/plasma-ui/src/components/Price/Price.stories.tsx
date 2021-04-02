import React from 'react';
import { boolean, number, select } from '@storybook/addon-knobs';

import { InSpacing } from '../../helpers/StoryDecorators';

import { Price } from '.';

export default {
    title: 'Content/Price',
    component: Price,
    decorators: [InSpacing],
};

export const Default = () => (
    <Price
        currency={select('currency', ['rub', 'usd', 'eur'], 'rub')}
        stroke={boolean('stroke', false)}
        minimumFractionDigits={number('minimumFractionDigits', 0)}
    >
        {number('children', 12345.67)}
    </Price>
);
