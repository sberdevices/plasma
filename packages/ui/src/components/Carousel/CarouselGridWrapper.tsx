import styled from 'styled-components';

import { StyledCarousel } from './Carousel';

/**
 * Компонент применяется, если требуется компенсировать отступы контейнера в сетке.
 */
export const CarouselGridWrapper = styled.div`
    overflow: hidden;
    margin-left: calc(var(--plasma-grid-margin) * -1);
    margin-right: calc(var(--plasma-grid-margin) * -1);

    /* stylelint-disable-next-line selector-nested-pattern */
    ${StyledCarousel} {
        scroll-padding: 0 var(--plasma-grid-margin);
        padding-left: var(--plasma-grid-margin);
        padding-right: var(--plasma-grid-margin);
    }
`;
