import React from 'react';
import styled from 'styled-components';
import { Carousel } from '@sberdevices/plasma-ui';

import { useDelayedActivation } from '../../../../hooks/useDelayedActivation';

import { ShopLandingCarouselProps } from './types';

const StyledCarousel = styled(Carousel)<{ initialized: boolean }>`
    padding: 0.25rem 0;
    outline: none;
    scroll-snap-type: none;
    scroll-behavior: ${({ initialized }) => (initialized ? 'smooth' : 'unset')};
`;

export const ShopLandingCarouselSberBox = React.forwardRef<HTMLDivElement, ShopLandingCarouselProps>(
    ({ children, index }, ref) => {
        const initialized = useDelayedActivation();

        return (
            <StyledCarousel ref={ref} axis="x" index={index} tabIndex={0} initialized={initialized} scrollAlign="start">
                {children}
            </StyledCarousel>
        );
    },
);
