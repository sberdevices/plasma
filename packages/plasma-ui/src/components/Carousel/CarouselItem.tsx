import React from 'react';
import styled from 'styled-components';
import { useCarouselItem, AsProps, applyScrollSnap, ScrollSnapProps } from '@sberdevices/plasma-core';

const StyledCarouselItem = styled.div`
    ${applyScrollSnap};
`;

export interface CarouselItemProps extends ScrollSnapProps, AsProps, React.HTMLAttributes<HTMLDivElement> {}

/**
 * Элемент списка. Используется для каруселей без сетки.
 */
export const CarouselItem: React.FC<CarouselItemProps> = ({ children, ...rest }) => {
    const itemRef = useCarouselItem<HTMLDivElement>();

    return (
        <StyledCarouselItem ref={itemRef} {...rest}>
            {children}
        </StyledCarouselItem>
    );
};
