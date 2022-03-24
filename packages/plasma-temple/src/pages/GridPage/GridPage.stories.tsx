import React from 'react';
import { action } from '@storybook/addon-actions';

import { GridPage } from './GridPage';
import { GridPageState } from './types';

export default {
    title: 'Pages/Grid',
};

const items = Array.from(
    { length: 20 },
    (_, index) =>
        ({
            id: String(index),
            text: 'Очень очень длинное длинное название ',
            image: { src: 'images/img.png' },
            position: 1,
        } as GridPageState['items'][number]),
);

const state: GridPageState = {
    items,
    background: { src: 'images/cat.png' },
};

export const Default = (): React.ReactElement => {
    return <GridPage state={state} onItemShow={action('onItemShow')} />;
};
