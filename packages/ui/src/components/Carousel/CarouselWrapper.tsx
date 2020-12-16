import styled, { css } from 'styled-components';

import { StyledCarousel } from './Carousel';

interface CarouselWrapperProps {
    /**
     * Если требуется компенсировать отступы контейнера в сетке
     */
    inContainer?: boolean;
}

export const CarouselWrapper = styled.div<CarouselWrapperProps>`
    overflow: hidden;

    ${({ inContainer }) =>
        inContainer &&
        css`
            margin-left: calc(var(--plasma-grid-margin) * -1);
            margin-right: calc(var(--plasma-grid-margin) * -1);

            ${StyledCarousel} {
                scroll-padding: 0 var(--plasma-grid-margin);
                padding-left: var(--plasma-grid-margin);
                padding-right: var(--plasma-grid-margin);
            }
        `}
`;
