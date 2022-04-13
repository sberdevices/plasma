import React from 'react';
import styled, { css } from 'styled-components';

import { applyScrollSnap, ScrollSnapProps } from '../../mixins';
import type { AsProps } from '../../types';

export interface VirtualCarouselItemProps extends ScrollSnapProps, AsProps, React.HTMLAttributes<HTMLDivElement> {
    /**
     * Смещение по оси
     */
    start: number;
    /**
     * Ось
     */
    axis: string;
}

const StyledItem = styled.div<VirtualCarouselItemProps>`
    position: absolute;
    top: 0;
    left: 0;
    ${applyScrollSnap}
    ${({ start, axis }) => css`
        transform: ${axis === 'x' ? 'translateX' : 'translateY'} (${start}px);
    `}
`;

export const VirtualCarouselItem: React.FC<VirtualCarouselItemProps> = ({
    scrollSnapAlign = 'center',
    children,
    ...rest
}) => {
    return (
        <StyledItem scrollSnapAlign={scrollSnapAlign} role="group" aria-roledescription="slide" {...rest}>
            {children}
        </StyledItem>
    );
};
