import React from 'react';
import styled from 'styled-components';
import { Image, Cell, Price, TextBox, Caption } from '@sberdevices/plasma-ui';

import { CartItemProps, imageContainerMixin, priceMixin, QuantityButton, titleMixin } from './CartItem@common';

const StyledTitle = styled(Caption)`
    ${titleMixin}
`;

const StyledPriceContainer = styled(Caption)`
    ${priceMixin};
`;

const StyledImageContainer = styled.div`
    ${imageContainerMixin}

    padding: 0.3rem;
    width: 3rem;
    margin-right: 0.75rem;
`;

const StyledQuantityButton = styled(QuantityButton)`
    margin-left: 0.75rem;
    margin-right: 4.5rem;
`;

export const CartItemSberPortal: React.FC<CartItemProps> = ({ item, currency, active }) => {
    const { id, name, price, quantity, imageSrc = '' } = item;

    return (
        <Cell
            contentLeft={
                <StyledImageContainer>
                    <Image base="div" src={imageSrc} ratio="1 / 1" />
                </StyledImageContainer>
            }
            content={
                <TextBox>
                    <StyledTitle>{name}</StyledTitle>
                    <StyledPriceContainer>
                        <Price currency={currency}>{price}</Price>
                    </StyledPriceContainer>
                </TextBox>
            }
            contentRight={<StyledQuantityButton id={id} quantity={quantity} active={active} />}
        />
    );
};
