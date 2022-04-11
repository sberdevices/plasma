import React from 'react';
import styled, { css } from 'styled-components';
import { Col, mediaQuery, Price, Row } from '@sberdevices/plasma-ui';
import { accent, headline2, headline3, primary } from '@sberdevices/plasma-tokens';

import { ProductPriceProps } from './types';

const StyledPrice = styled(Price)<{ old?: boolean }>`
    ${headline2}

    ${mediaQuery(
        'M',
        2,
    )(css`
        ${headline3}
    `)}

    ${mediaQuery(
        'S',
        1,
    )(css`
        ${headline3}
    `)}

    color: ${accent};
    ${({ old }) =>
        old &&
        css`
            color: ${primary};
            opacity: 0.28;
            text-decoration: line-through;
        `}
`;

/** Компонент для отображения цены на странице товара */
export const ProductPrice: React.FC<ProductPriceProps> = ({ price, oldPrice, className, ...rest }) => {
    if (!price) {
        return null;
    }

    return (
        <Row className={className}>
            <Col>
                <StyledPrice {...rest}>{price}</StyledPrice>
            </Col>
            {oldPrice && (
                <Col>
                    <StyledPrice {...rest} old>
                        {oldPrice}
                    </StyledPrice>
                </Col>
            )}
        </Row>
    );
};
