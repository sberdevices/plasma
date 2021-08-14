import React from 'react';
import styled from 'styled-components';
import { Image, TextBox, Caption, Row, Col } from '@sberdevices/plasma-ui';

import {
    CartItemProps,
    imageContainerMixin,
    Present,
    priceMixin,
    QuantityButton,
    titleMixin,
    Price,
} from './CartItem@common';

const StyledRow = styled(Row)`
    margin-bottom: 1.25rem;
`;

const StyledLeftCol = styled(Col)`
    display: flex;
    align-items: center;
`;

const StyledTitle = styled(Caption)`
    ${titleMixin}
`;

const StyledPriceContainer = styled(Caption)`
    ${priceMixin};
`;

const StyledImageContainer = styled.div`
    ${imageContainerMixin}

    padding: 0.3rem;
    min-width: 3rem;
    margin-right: 0.75rem;
`;

const StyledTextBox = styled(TextBox)`
    width: calc(100% - 3rem);
`;

export const CartItemMobile: React.FC<CartItemProps> = ({ item, currency, ...props }) => {
    const { id, name, price, quantity, imageSrc = '', present } = item;

    return (
        <StyledRow>
            <StyledLeftCol sizeS={2}>
                <StyledImageContainer>
                    <Image base="div" src={imageSrc} ratio="1 / 1" />
                </StyledImageContainer>
                <StyledTextBox>
                    <StyledTitle>{name}</StyledTitle>
                    <StyledPriceContainer>
                        <Price price={price} currency={currency} present={present} />
                    </StyledPriceContainer>
                </StyledTextBox>
            </StyledLeftCol>
            <Col sizeS={2}>{present ? <Present /> : <QuantityButton id={id} quantity={quantity} {...props} />}</Col>
        </StyledRow>
    );
};
