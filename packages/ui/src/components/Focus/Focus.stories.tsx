import React from 'react';

import Story from '../../helpers/Story';
import { Cart } from '../Cart/Cart';
import { withAutoFocus } from './Focus';
import { number } from '@storybook/addon-knobs';

export default {
    title: 'Focus',
};

const FocusableCart = withAutoFocus(Cart);

export const Default = () => (
    <Story>
        <FocusableCart amount={number('Amount', 5)} />
    </Story>
);
