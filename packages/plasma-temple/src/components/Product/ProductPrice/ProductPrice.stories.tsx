import React from 'react';
import { number } from '@storybook/addon-knobs';

import { ProductPrice } from './ProductPrice';

export default {
    title: 'Product/Price',
};

export const Default = (): React.ReactElement => (
    <ProductPrice price={number('price', 68.9)} oldPrice={number('old price', 118.9)} />
);
