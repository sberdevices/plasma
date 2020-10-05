import React from 'react';
import { number } from '@storybook/addon-knobs';

import { Cart } from './Cart';

export default {
    title: 'Cart',
};

export const Default = () => (
    <Cart tabIndex={0} amount={number('Amount', 5)}>
        {number('Total', 2350)}&nbsp;₽
    </Cart>
);

export const Empty = () => <Cart tabIndex={0} amount={number('Amount', 5)} />;
