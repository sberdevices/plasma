import React from 'react';
import { action } from '@storybook/addon-actions';

import { ShopLandingPage } from '../src/pages/ShopLandingPage/ShopLandingPage';

export default {
    title: 'Shop Landing Page',
};

const items = Array.from({ length: 4 }, (_, i) => {
    const n = i + 1;

    return {
        id: `id${n}`,
        label: `Label ${n}`,
        position: n,
        image: {
            src: './images/320_320_2.jpg',
        },
    };
});

export const Default: React.FC = () => (
    <ShopLandingPage
        onCatalogOpen={action('onCatalogOpen')}
        onStoreInfoClick={action('onStoreInfoClick')}
        onItemClick={action('onItemClick')}
        state={{
            catalogImage: './images/320_320_2.jpg',
            items,
        }}
    />
);
