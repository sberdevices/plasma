import React from 'react';
import { text } from '@storybook/addon-knobs';

import Story from '../../helpers/Story';
import { Cart } from '../Cart/Cart';

import { HeaderButton } from './HeaderButton';

export default {
    title: 'HeaderButton',
};

export const Default = () => (
    <Story>
        <HeaderButton>{text('Text', 'Текст')}</HeaderButton>
    </Story>
);

export const withCart = () => (
    <Story>
        <HeaderButton>
            <Cart amount={5}>2350&nbsp;₽</Cart>
        </HeaderButton>
    </Story>
);
