import React from 'react';
import { Headline3 } from '@sberdevices/plasma-ui';

import { ProductPriceProps } from './ProductPrice';
import { ProductPriceCommon } from './ProductPrice@common';

export const ProductPriceSberPortal: React.FC<ProductPriceProps> = (props) => (
    <Headline3>
        <ProductPriceCommon {...props} />
    </Headline3>
);
