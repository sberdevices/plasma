import React from 'react';
import { Headline2 } from '@sberdevices/plasma-ui';

import { ProductPriceCommon } from './ProductPrice@common';
import { ProductPriceProps } from './types';

export const ProductPriceSberBox: React.FC<ProductPriceProps> = (props) => (
    <Headline2>
        <ProductPriceCommon {...props} />
    </Headline2>
);
