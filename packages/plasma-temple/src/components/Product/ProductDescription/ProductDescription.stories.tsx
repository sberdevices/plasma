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
    {
        title: 'заголовок',
        content: 'длинное описание @@@',
    },
    {
        title: 'заголовок',
        content: 'Очень очень длинное описание',
    },
    {
        title: 'очень длинный заголовок',
        content: 'Очень очень длинное описание',
    },
    {
        title: 'Габариты контроллера (д×ш×в)',
        content: '64 × 24 × 11,7 мм',
    },
    {
        title: 'Размер без учёта крепления на DIN-рейку (ш × г × в)',
        content: '46 × 46 × 18 мм',
    },
    {
        title: 'Без контента',
        content: '',
    },
];

export const Default = (): React.ReactElement => (
    <ProductDescription layout={select('layout', ['row', 'column'], 'row')} items={items} />
);
