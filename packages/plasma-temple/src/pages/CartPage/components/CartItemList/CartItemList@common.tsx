import React from 'react';
import styled, { css } from 'styled-components';
import { Carousel, CarouselCol, mediaQuery, Row } from '@sberdevices/plasma-ui';

import { CartItem } from '../CartItem/CartItem';
import { CartItem as CartItemType } from '../../types';
import { useRemoteHandlers } from '../../../../hooks/useRemoteHandlers';
import { Insets, useInsets } from '../../../../hooks/useInsets';
import { Currency } from '../../../../types';
import { useSpatNavStop } from '../../../../hooks/useSpatNav';

export interface CartItemListProps {
    items: CartItemType[];
    currency: Currency;
    itemImageBackgroundColor?: string;
    onItemClick?: (item: CartItemType) => void;
}

const StyledCarouselGridWrapper = styled.div<Partial<Insets>>`
    height: calc(100vh - 5rem);

    padding-bottom: ${({ bottom = 0 }) => bottom}px;
    box-sizing: border-box;

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

export const CartItemListCommon: React.FC<CartItemListProps> = ({
    items,
    currency,
    itemImageBackgroundColor,
    onItemClick,
}) => {
    const [activeButton, setActiveButton] = React.useState<'left' | 'right'>('right');

    useSpatNavStop('y');
    const insets = useInsets();

    const [cartIndex, setCartIndex] = useRemoteHandlers({
        initialIndex: 0,
        axis: 'y',
        min: 0,
        max: items.length - 1,
        repeat: false,
        delay: 150,
    });

    return (
        <StyledCarouselGridWrapper bottom={insets.bottom}>
            <Carousel
                axis="y"
                as={StyledRow}
                index={cartIndex}
                scrollAlign="start"
                scrollSnapType="mandatory"
                tabIndex={-1}
            >
                {items.map((item, index) => (
                    <CarouselCol key={`${item.id}-${index}`} scrollSnapAlign="start">
                        <CartItem
                            index={index}
                            item={item}
                            currency={currency}
                            onItemClick={onItemClick}
                            setActiveIndex={setCartIndex}
                            focused={index === cartIndex}
                            activeButton={activeButton}
                            setActiveButton={setActiveButton}
                            imageBackgroundColor={itemImageBackgroundColor}
                        />
                    </CarouselCol>
                ))}
            </Carousel>
        </StyledCarouselGridWrapper>
    );
};
