import React from 'react';
import { action } from '@storybook/addon-actions';
import { Headline2 } from '@sberdevices/plasma-ui';

import { ItemEntities } from './ItemEntities';

export default {
    title: 'Guide Exhibit List',
};

const item = {
    onClick: action('onClick'),
    url:
        'https://media.izi.travel/40d42708-fcd2-4fb0-a7cc-6355fef9c691/e236666b-c520-406f-93f4-3c78717d8191_800x600.jpg',
    title: 'Теодор Курентзис о Казимире Малевиче',
    order: 1,
    uuid: 'uuid',
};

const list = Array.from({ length: 5 }, (_, index) => ({
    ...item,
    order: index + 1,
}));
export const Default: React.FC = () => (
    <ItemEntities list={list} platformComponents={{ Title: Headline2 }} title="Все остановки" />
);
