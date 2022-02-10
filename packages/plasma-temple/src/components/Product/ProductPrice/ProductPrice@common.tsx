import React from 'react';
import styled, { css } from 'styled-components';
import { Col, Price, Row } from '@sberdevices/plasma-ui';
import { accent, primary } from '@sberdevices/plasma-tokens';

import { ProductPriceProps } from './types';

const StyledPrice = styled(Price)<{ old?: boolean }>`
    color: ${accent};
    ${({ old }) =>
        old &&
        css`
            color: ${primary};
            opacity: 0.28;
            text-decoration: line-through;
        `}
`;

export const ProductPriceCommon: React.FC<ProductPriceProps> = ({ price, oldPrice, currency, className }) => {
    if (!price) {
        return null;
    }

    return (
        <Row className={className}>
            <Col>
                <StyledPrice currency={currency}>{price}</StyledPrice>
            </Col>
            {oldPrice && (
                <Col>
                    <StyledPrice currency={currency} old>
                        {oldPrice}
                    </StyledPrice>
                </Col>
            )}
        </Row>
    );
};
