import React from 'react';

import { CommonCarousel, CarouselProps } from './Carousel';

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
    ({ axis, onIndexChange, index, children }, ref) => (
        <CommonCarousel
            axis={axis}
            index={index}
            animatedScrollByIndex
            onIndexChange={onIndexChange}
            paddingEnd="50vh"
            ref={ref}
        >
            {children}
        </CommonCarousel>
    ),
);
