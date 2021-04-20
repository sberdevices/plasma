import React from 'react';
import { Headline2 } from '@sberdevices/plasma-ui';

import { ProductPriceProps } from './ProductPrice';
import { ProductPriceCommon } from './ProductPrice@common';

export const ProductPriceSberBox: React.FC<ProductPriceProps> = (props) => (
    <Headline2>
        <ProductPriceCommon {...props} />
    </Headline2>
);
