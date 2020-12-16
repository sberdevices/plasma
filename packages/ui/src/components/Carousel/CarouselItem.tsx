import React from 'react';
import styled, { css } from 'styled-components';

import { PickOptional } from '../../types';

import { useCarouselItem } from './Carousel.hooks';
import { ScrollSnapProps, StyledRefProps } from './Carousel.types';

export interface StyledCarouselItemProps
    extends Omit<ScrollSnapProps, 'scrollSnapType'>,
        StyledRefProps<HTMLDivElement | null> {}

const StyledCarouselItem = styled.div<StyledCarouselItemProps>`
    transition: transform 0.1s ease;

    ${({ scrollSnapAlign }) =>
        scrollSnapAlign &&
        css`
            scroll-snap-align: ${scrollSnapAlign};
        `}
`;

export interface CarouselItemProps
    extends PickOptional<ScrollSnapProps, 'scrollSnapAlign'>,
        React.HTMLAttributes<HTMLDivElement> {
    as?: React.ComponentType<object>;
    scaleCallback?: (pitch: number, itemEl: Element) => React.CSSProperties;
}

export const CarouselItem: React.FC<CarouselItemProps> = ({ children, ...rest }) => {
    const itemRef = useCarouselItem<HTMLDivElement | null>();

    return (
        <StyledCarouselItem ref={itemRef} {...rest}>
            {children}
        </StyledCarouselItem>
    );
};
