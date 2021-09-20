import React from 'react';
import styled, { css } from 'styled-components';
import { Carousel, CarouselCol, mediaQuery, Row } from '@sberdevices/plasma-ui';

import { CartItem } from '../CartItem/CartItem';
import { CartItem as CartItemType } from '../../types';
import { Currency } from '../../../../types';

export interface CartItemListProps {
    items: CartItemType[];
    currency: Currency;
    onItemClick?: (item: CartItemType) => void;
}

const StyledCarouselGridWrapper = styled.div`
    height: calc(100vh - 5rem);

    ${mediaQuery(
        'M',
        2,
    )(
        css`
            height: calc(100vh - 4.5rem);
        `,
    )}
`;

const StyledRow = styled(Row)`
    scroll-behavior: smooth;
`;

export const CartItemListCommon: React.FC<CartItemListProps> = ({ items, currency, onItemClick }) => {
    const [currentCartItem, setCurrentCartItem] = React.useState(0);

    return (
        <StyledCarouselGridWrapper>
            <Carousel
                axis="y"
                as={StyledRow}
                index={currentCartItem}
                scrollAlign="center"
                scrollSnapType="mandatory"
                paddingEnd="50%"
                tabIndex={-1}
            >
                {items.map((item, index) => (
                    <CarouselCol key={`${item.id}-${index}`} scrollSnapAlign="center">
                        <CartItem
                            index={index}
                            item={item}
                            currency={currency}
                            setActiveIndex={setCurrentCartItem}
                            onItemClick={onItemClick}
                        />
                    </CarouselCol>
                ))}
            </Carousel>
        </StyledCarouselGridWrapper>
    );
};
