import React from 'react';

import { Collapse } from '../../../Collapse/Collapse';
import { ProductDetails } from '../ProductDetails';

import { ExpandableProductDetailsProps } from './ExpandableProductDetails@common';

export const ExpandableProductDetailsMobile = React.memo<ExpandableProductDetailsProps>(({ title, ...restProps }) => {
    return (
        <Collapse title={title}>
            <ProductDetails {...restProps} />
        </Collapse>
    );
});
