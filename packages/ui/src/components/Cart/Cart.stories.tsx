import React from 'react';
import { number } from '@storybook/addon-knobs';

import Cart from './Cart';

export default {
    title: 'Cart',
};

export const Default = () => <Cart amount={number('Amount', 5)} total={number('Total', 2350)} />;
