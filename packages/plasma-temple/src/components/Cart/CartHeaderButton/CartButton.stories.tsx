import React from 'react';
import { action } from '@storybook/addon-actions';

import { CartHeaderButton } from './CartHeaderButton';

export default {
    title: 'Cart/CartHeaderButton',
};

const onClick = action('onclick');

export const Default = () => <CartHeaderButton quantity={4} amount={1750} onClick={onClick} />;

export const EmptyCart = () => <CartHeaderButton quantity={0} amount={0} onClick={onClick} />;

export const WithPrice = () => <CartHeaderButton quantity={4} amount={1750} onClick={onClick} withPrice />;
