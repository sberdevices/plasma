import React from 'react';
import styled from 'styled-components';
import { Footnote1 } from '@sberdevices/plasma-ui';
import { secondary } from '@sberdevices/plasma-tokens';

import { Collapse } from '../../Collapse/Collapse';

import { ProductInfoProps } from './ProductInfo@common';

const StyledInfo = styled(Footnote1)`
    color: ${secondary};
    hyphens: none;
`;

export const ProductInfoMobile = React.memo<ProductInfoProps>(({ title, info }) => {
    return (
        <Collapse title={title}>
            <StyledInfo>{info}</StyledInfo>
        </Collapse>
    );
});
