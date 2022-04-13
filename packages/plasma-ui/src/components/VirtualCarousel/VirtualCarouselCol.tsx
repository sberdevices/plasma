import React from 'react';
import styled from 'styled-components';
import { applyScrollSnap, ScrollSnapProps, VirtualCarouselItemProps } from '@sberdevices/plasma-core';

import { Col, ColProps } from '../Grid';

const StyledCol = styled(Col)<ScrollSnapProps>`
    ${applyScrollSnap};
`;

export interface VirtualCarouselCarouselColProps
    extends ColProps,
        VirtualCarouselItemProps,
        React.HTMLAttributes<HTMLDivElement> {
    axis: string;
}

/**
 * Элемент списка. В рамках интерфейса элемент наследуется от ``Col`` и ``CarouselItem``.
 * Используется для каруселей с сеткой.
 */
export const VirtualCarouselCol: React.FC<VirtualCarouselCarouselColProps> = ({
    axis,
    start,
    children,
    style,
    ...rest
}) => {
    return (
        <StyledCol
            style={{
                transform: axis === 'x' ? `translateX(${start}px)` : `translateY(${start}px)`,
                position: 'absolute',
                top: 0,
                left: 0,
                ...style,
            }}
            type="calc"
            role="group"
            aria-roledescription="slide"
            {...rest}
        >
            {children}
        </StyledCol>
    );
};
