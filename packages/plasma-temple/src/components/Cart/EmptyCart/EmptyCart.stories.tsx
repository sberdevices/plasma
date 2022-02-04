import React from 'react';
import { action } from '@storybook/addon-actions';

import { EmptyCart } from './EmptyCart';

export default {
    title: 'Cart/EmptyCart',
};

export const Default = (): React.ReactElement => {
    return (
        <EmptyCart imageSrc="images/empty-cart.png" onGoToCatalog={action('onGoToCatalog')} insets={{ bottom: 72 }} />
    );
};
