import React from 'react';
import { Story, Meta } from '@storybook/react';

import { InSpacingDecorator, disableProps } from '../../helpers';

import { Price, PriceProps } from '.';

const currencyOptions = ['rub', 'usd', 'eur'];
const propsToDisable = ['children', 'theme', 'as', 'forwardedAs'];

export default {
    title: 'Content/Price',
    component: Price,
    decorators: [InSpacingDecorator],
    argTypes: {
        currency: {
            control: {
                type: 'inline-radio',
                options: currencyOptions,
            },
        },
        ...disableProps(propsToDisable),
    },
} as Meta;

export const Default: Story<PriceProps & { priceLabel: number }> = ({ priceLabel, ...rest }) => (
    <Price {...rest}>{priceLabel}</Price>
);

Default.args = {
    currency: 'rub',
    stroke: false,
    minimumFractionDigits: 0,
    priceLabel: 12345.67,
};
