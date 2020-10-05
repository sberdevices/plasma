import React from 'react';
import { text } from '@storybook/addon-knobs';

import { Cart } from '../Cart/Cart';

import { HeaderButton } from './HeaderButton';

export default {
    title: 'HeaderButton',
};

export const Default = () => <HeaderButton>{text('Text', 'Текст')}</HeaderButton>;

export const withCart = () => (
    <HeaderButton>
        <Cart amount={5}>2350&nbsp;₽</Cart>
    </HeaderButton>
);
