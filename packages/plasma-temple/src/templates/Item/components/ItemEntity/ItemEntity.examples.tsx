import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, number } from '@storybook/addon-knobs';

import { ItemEntity } from './ItemEntity';

export default {
    title: 'Guide Exhibit Item',
};

export const Default: React.FC = () => (
    <ItemEntity
        onClick={action('onClick')}
        url={text(
            'image',
            'https://media.izi.travel/40d42708-fcd2-4fb0-a7cc-6355fef9c691/e236666b-c520-406f-93f4-3c78717d8191_800x600.jpg',
        )}
        title={text('title', 'Теодор Курентзис о Казимире Малевиче')}
        order={number('order', 1)}
    />
);
