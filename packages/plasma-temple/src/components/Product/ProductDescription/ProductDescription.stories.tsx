import React from 'react';
import { select } from '@storybook/addon-knobs';

import { Description } from '../../../types';

import { ProductDescription } from './ProductDescription';

export default {
    title: 'Product/Description',
};

const items: Description[] = [
    {
        title: 'Цоколь',
        content: 'Е27',
    },
    {
        title: 'Световой поток',
        content: '860 лм',
    },
    {
        title: 'Цветов',
        content: '16 млн',
    },
    {
        title: 'Гарантия',
        content: '2 года',
    },
];

export const Default = (): React.ReactElement => (
    <ProductDescription layout={select('layout', ['row', 'column'], 'row')} items={items} />
);
