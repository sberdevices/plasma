import React from 'react';
import { text } from '@storybook/addon-knobs';

import { ProductTitle } from './ProductTitle';

export default {
    title: 'Product/Title',
};

export const Default = (): React.ReactElement => (
    <ProductTitle
        title={text('title', 'Пицца Цезарь')}
        subtitle={text(
            'subtitle',
            'Свежие листья салата айсберг, цыпленок, томаты черри, сыры чеддер и пармезан, моцарелла, соус альфредо, соус цезарь.',
        )}
    />
);
