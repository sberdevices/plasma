import React from 'react';
import styled, { css } from 'styled-components';

import { Col, ColProps } from '../Grid';

import { useCarouselItem } from './Carousel.hooks';
import { CarouselItemProps, StyledCarouselItemProps } from './CarouselItem';

const StyledCarouselCol = styled(Col)<StyledCarouselItemProps>`
    ${({ scrollSnapAlign }) =>
        scrollSnapAlign &&
        css`
            scroll-snap-align: ${scrollSnapAlign};
        `}
`;

export interface CarouselColProps extends ColProps, CarouselItemProps, React.HTMLAttributes<HTMLDivElement> {}

export const CarouselCol: React.FC<CarouselColProps> = ({ children, ...rest }) => {
    const itemRef = useCarouselItem<HTMLDivElement | null>();

    return (
        <StyledCarouselCol ref={itemRef} type="calc" {...rest}>
            {children}
        </StyledCarouselCol>
    );
};
