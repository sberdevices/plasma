import React from 'react';
import styled from 'styled-components';
import { useCarouselItem } from '@sberdevices/plasma-core';
import { applyScrollSnap, ScrollSnapProps } from '@sberdevices/plasma-core/mixins';

export interface CarouselItemProps extends ScrollSnapProps, React.HTMLAttributes<HTMLLIElement> {}

const StyledItem = styled.li<CarouselItemProps>`
    ${applyScrollSnap}
`;

export const CarouselItem: React.FC<CarouselItemProps> = ({ scrollSnapAlign = 'center', children, ...rest }) => {
    const ref = useCarouselItem<HTMLLIElement>();

    return (
        <StyledItem ref={ref} scrollSnapAlign={scrollSnapAlign} {...rest}>
            {children}
        </StyledItem>
    );
};
