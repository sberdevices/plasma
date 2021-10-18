import React from 'react';
import styled from 'styled-components';
import { TextBox, Caption, Row, Col } from '@sberdevices/plasma-ui';

import {
    CartItemProps,
    imageContainerMixin,
    priceMixin,
    QuantityButton,
    titleMixin,
    Present,
    Price,
    StyledImage,
} from './CartItem@common';

const StyledRow = styled(Row)`
    margin-bottom: 0.5rem;
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

const StyledImageContainer = styled.div<{ backgroundColor?: string }>`
    ${imageContainerMixin({ padding: 0.3 })}

    min-width: 3rem;
    height: 3rem;
    margin-right: 0.75rem;
`;

const StyledQuantityCol = styled(Col)`
    padding-right: 3.5rem;
`;

const StyledTextBox = styled(TextBox)`
    width: calc(100% - 3rem);
`;

export const CartItemSberPortal: React.FC<CartItemProps> = ({
    item,
    currency,
    imageBackgroundColor,
    onItemClick,
    ...props
}) => {
    const { id, name, price, quantity, imageSrc = '', present } = item;

    const clickHandler = React.useCallback(() => onItemClick?.(item), [onItemClick, item]);

    return (
        <StyledRow>
            <StyledLeftCol sizeM={3}>
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
            <StyledQuantityCol sizeM={3}>
                {present ? <Present /> : <QuantityButton id={id} quantity={quantity} {...props} />}
            </StyledQuantityCol>
        </StyledRow>
    );
};
