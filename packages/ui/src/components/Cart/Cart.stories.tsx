import React from 'react';
import { number } from '@storybook/addon-knobs';

import Story from '../../helpers/Story';

import Cart from './Cart';

export default {
    title: 'Cart',
};

export const Default = () => (
    <Story>
        <Cart amount={number('Amount', 5)}>{number('Total', 2350)}&nbsp;₽</Cart>
    </Story>
);

export const Empty = () => (
    <Story>
        <Cart amount={number('Amount', 5)} />
    </Story>
);
