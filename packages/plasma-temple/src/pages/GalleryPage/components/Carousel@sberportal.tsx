import React from 'react';

import { CommonCarousel, CarouselProps } from './Carousel';

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
    ({ axis, onIndexChange, index, children }, ref) => (
        <CommonCarousel
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
        </CommonCarousel>
    ),
);
