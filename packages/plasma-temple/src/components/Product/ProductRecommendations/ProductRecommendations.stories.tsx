import { action } from '@storybook/addon-actions';
import React from 'react';

import { ProductEntity } from '../types';

import { ProductRecommendations } from './ProductRecommendations';

export default {
    title: 'Product/Recommendations',
    excludeStories: /recommendations/,
};

export const recommendations: ProductEntity[] = [
    {
        id: '1',
        name: 'Название',
        price: 990,
        oldPrice: 17200,
        images: ['images/img.png'],
    },
    {
        id: '2',
        name: 'Очень длинное название',
        nameDetails: '1л',
        price: 990,
        oldPrice: 17200,
        images: ['images/img.png'],
    },
    {
        id: '3',
        name: 'Очень очень длинное название',
        price: 990.9,
        oldPrice: 17200,
        images: ['images/img.png'],
    },
    {
        id: '4',
        name: 'Очень очень длинное название',
        price: 990.9,
        oldPrice: 17200,
        images: ['images/img.png'],
    },
    {
        id: '5',
        name: 'Очень длинное название',
        price: 990.9,
        oldPrice: 17200,
        images: ['images/img.png'],
    },
];

export const Default = (): React.ReactElement => {
    return (
        <ProductRecommendations
            title="Похожие товары"
            recommendations={recommendations}
            onClick={action('onClickRecommendation')}
        />
    );
};
