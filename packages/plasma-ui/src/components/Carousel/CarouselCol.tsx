import React from 'react';
import styled from 'styled-components';
import { applyScrollSnap, ScrollSnapProps, CarouselItemProps } from '@sberdevices/plasma-core';

import { Col, ColProps } from '../Grid';

import { useCarouselItem } from './Carousel.hooks';

const StyledCol = styled(Col)<ScrollSnapProps>`
    ${applyScrollSnap};
`;

export interface CarouselColProps extends ColProps, CarouselItemProps, React.HTMLAttributes<HTMLDivElement> {}

/**
 * Элемент списка. В рамках интерфейса элемент наследуется от ``Col`` и ``CarouselItem``.
 * Используется для каруселей с сеткой.
 */
export const CarouselCol: React.FC<CarouselColProps> = ({ children, ...rest }) => {
    const itemRef = useCarouselItem<HTMLDivElement>();

    return (
        <StyledCol ref={itemRef} type="calc" role="group" aria-roledescription="slide" {...rest}>
            {children}
        </StyledCol>
    );
};
