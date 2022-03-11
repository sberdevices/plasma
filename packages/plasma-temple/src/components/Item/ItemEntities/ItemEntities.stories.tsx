import React from 'react';
import { action } from '@storybook/addon-actions';

import { ItemEntityType } from '../types';

import { ItemEntities } from './ItemEntities';

export default {
    title: 'Item/ItemEntities',
};

const entities: ItemEntityType[] = [
    {
        id: 1,
        name: 'Космос',
        image: {
            src: 'images/cat.png',
        },
    },
    {
        id: 2,
        name: 'Животные',
        image: {
            src: 'images/cat.png',
        },
    },
    {
        id: 3,
        name: 'Как все устроено',
        image: {
            src: 'images/cat.png',
        },
    },
    {
        id: 4,
        name: 'лейбл',
        image: {
            src: 'images/cat.png',
        },
    },
    {
        id: 5,
        name: 'лейбл',
        image: {
            src: 'images/cat.png',
        },
    },
];

export const Default = (): React.ReactElement => {
    return (
        <>
            <ItemEntities title="Все экспонаты" entities={entities} onClick={action('onClick')} />
        </>
    );
};

export const Carousel = (): React.ReactElement => {
    return (
        <>
            <ItemEntities title="Все экспонаты" entities={entities} view="carousel" onClick={action('onClick')} />
        </>
    );
};
