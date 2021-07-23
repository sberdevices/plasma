import React from 'react';
import styled from 'styled-components';
import { CarouselProps } from '@sberdevices/plasma-ui';

import { CommonCarousel } from './Carousel';

const StyledCarousel = styled(CommonCarousel)`
    scroll-behavior: auto;
`;

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
    ({ axis, onIndexChange, index, children }, ref) => (
        <StyledCarousel
            axis={axis}
            index={index}
            detectActive
            detectThreshold={0.4}
            onIndexChange={onIndexChange}
            scrollAlign="start"
            scrollSnapType="mandatory"
            paddingEnd="50vh"
            ref={ref}
        >
            {children}
        </StyledCarousel>
    ),
);
