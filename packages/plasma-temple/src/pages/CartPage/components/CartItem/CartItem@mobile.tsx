import React from 'react';
import styled from 'styled-components';
import { TextBox, Caption, Row, Col } from '@sberdevices/plasma-ui';

import {
    CartItemProps,
    imageContainerMixin,
    Present,
    priceMixin,
    QuantityButton,
    titleMixin,
    Price,
    StyledImage,
} from './CartItem@common';

const StyledRow = styled(Row)`
    display: flex;
    margin-bottom: 1.25rem;
    flex-wrap: nowrap;

    align-items: center;
`;

const StyledLeftCol = styled(Col)`
    display: flex;
    align-items: center;
`;

const StyledRigthCol = styled(Col)`
    margin-left: auto;
`;

const StyledTitle = styled(Caption)`
    ${titleMixin}
`;

const StyledPriceContainer = styled(Caption)`
    ${priceMixin};
`;

const StyledImageContainer = styled.div<{ backgroundColor?: string }>`
    ${imageContainerMixin({ padding: 0.3 })}

    min-width: 3.5rem;
    width: 3.5rem;
    height: 3.5rem;
    margin-right: 0.75rem;
`;

const StyledTextBox = styled(TextBox)`
    width: calc(100% - 3.5rem);
`;

export const CartItemMobile: React.FC<CartItemProps> = ({
    item,
    currency,
    imageBackgroundColor,
    onItemClick,
    ...props
}) => {
    const { id, name, price, quantity, imageSrc = '', present } = item;

    const clickHandler = React.useCallback(() => onItemClick?.(item), [onItemClick, item]);

    return (
        <StyledRow data-cy="CartItem">
            <StyledLeftCol sizeS={2}>
                <StyledImageContainer backgroundColor={imageBackgroundColor} onClick={clickHandler}>
                    <StyledImage imageSrc={imageSrc} />
                </StyledImageContainer>
                <StyledTextBox>
                    <StyledTitle>{name}</StyledTitle>
                    <StyledPriceContainer>
                        <Price price={price} currency={currency} present={present} />
                    </StyledPriceContainer>
                </StyledTextBox>
            </StyledLeftCol>
            <StyledRigthCol sizeS={2}>
                {present ? <Present /> : <QuantityButton id={id} quantity={quantity} {...props} />}
            </StyledRigthCol>
        </StyledRow>
    );
};
