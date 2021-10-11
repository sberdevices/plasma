import React from 'react';

import { Description } from '../../../types';

import { ProductCharacteristics } from './ProductCharacteristics';

export default {
    title: 'Product/Characteristics',
};

const characteristics: Description[] = [
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

export const Default = (): React.ReactElement => <ProductCharacteristics characteristics={characteristics} />;
