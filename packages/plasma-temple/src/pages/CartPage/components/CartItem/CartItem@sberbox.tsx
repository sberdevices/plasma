import React from 'react';
import styled from 'styled-components';
import { Body1, Image, Cell, Footnote1, Price, TextBox } from '@sberdevices/plasma-ui';
import { secondary } from '@sberdevices/plasma-tokens';

import { CartItemProps, imageContainerMixin, priceMixin, QuantityButton, titleMixin } from './CartItem@common';

export const StyledTitleContainer = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
`;

const StyledTitle = styled(Body1)`
    ${titleMixin}
`;

const StyledPriceContainer = styled(Footnote1)`
    ${priceMixin};
`;

const StyledImageContainer = styled.div`
    ${imageContainerMixin}

    padding: 0.43rem;
    width: 3.75rem;
    margin-right: 1rem;
`;

const StyledNameDetails = styled.span`
    margin-left: 6px;
    color: ${secondary};
`;

const StyledQuantityButton = styled(QuantityButton)`
    margin-left: 1rem;
`;

export const CartItemSberBox: React.FC<CartItemProps> = ({ item, currency, active }) => {
    const { id, name, price, nameDetails, quantity, imageSrc = '' } = item;

    return (
        <Cell
            contentLeft={
                <StyledImageContainer>
                    <Image base="div" src={imageSrc} ratio="1 / 1" />
                </StyledImageContainer>
            }
            content={
                <TextBox>
                    <StyledTitleContainer>
                        <StyledTitle>{name}</StyledTitle>
                        <StyledNameDetails>{nameDetails}</StyledNameDetails>
                    </StyledTitleContainer>
                    <StyledPriceContainer>
                        <Price currency={currency}>{price}</Price>
                    </StyledPriceContainer>
                </TextBox>
            }
            contentRight={<StyledQuantityButton id={id} quantity={quantity} active={active} />}
        />
    );
};
