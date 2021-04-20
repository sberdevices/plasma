import React from 'react';
import { number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { ProductActionButton } from './ProductActionButton';

export default {
    title: 'Product/Action Button',
};

export const Default = (): React.ReactElement => (
    <ProductActionButton actionButtonText="Купить" onClick={action('onClick')} />
);

export const WithAutoFocus = (): React.ReactElement => (
    <ProductActionButton actionButtonText="Купить" onClick={action('onClick')} autoFocus />
);

export const WithRightContent = (): React.ReactElement => (
    <ProductActionButton actionButtonText="Купить" onClick={action('onClick')} contentRight="68,90 ₽" />
);

export const WithQuantity = (): React.ReactElement => (
    <ProductActionButton
        actionButtonText="Купить"
        onClick={action('onClick')}
        autoFocus
        withQuantity
        quantity={number('quantity', 1)}
        onChangeQuantity={action('onChangeQuantity')}
    />
);
