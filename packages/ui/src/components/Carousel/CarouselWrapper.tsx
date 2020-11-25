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
            margin-left: calc(var(--container-padding) * -1);
            margin-right: calc(var(--container-padding) * -1);

            & ${StyledCarousel} {
                padding-left: var(--container-padding);
            }

            & ${StyledCarouselTrack} {
                padding-right: var(--container-padding);
            }
        `}
`;

export interface CarouselWrapperProps extends StyledCarouselWrapperProps, React.HTMLAttributes<HTMLDivElement> {}

export const CarouselWrapper: React.FC<CarouselWrapperProps> = ({ children, ...rest }) => (
    <StyledCarouselWrapper {...rest}>{children}</StyledCarouselWrapper>
);
