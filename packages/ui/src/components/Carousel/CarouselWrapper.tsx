import React from 'react';
import styled, { css } from 'styled-components';

import { StyledCarousel, StyledCarouselTrack } from './Carousel';

interface StyledCarouselWrapperProps {
    /**
     * Если требуется компенсировать отступы контейнера в сетке
     */
    inContainer?: boolean;
}

const StyledCarouselWrapper = styled.div<StyledCarouselWrapperProps>`
    overflow: hidden;

    ${({ inContainer }) =>
        inContainer &&
        css`
            margin-left: calc(var(--plasma-grid-margin) * -1);
            margin-right: calc(var(--plasma-grid-margin) * -1);

            & ${StyledCarousel} {
                scroll-padding: 0 var(--plasma-grid-margin);
                padding-left: var(--plasma-grid-margin);
            }

            & ${StyledCarouselTrack} {
                padding-right: var(--plasma-grid-margin);
            }
        `}
`;

export interface CarouselWrapperProps extends StyledCarouselWrapperProps, React.HTMLAttributes<HTMLDivElement> {}

export const CarouselWrapper: React.FC<CarouselWrapperProps> = ({ children, ...rest }) => (
    <StyledCarouselWrapper {...rest}>{children}</StyledCarouselWrapper>
);
