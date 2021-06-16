import React from 'react';
import { CarouselProps } from '@sberdevices/plasma-ui';

import { CommonCarousel } from './Carousel';

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(({ axis, index, children }, ref) => (
    <CommonCarousel axis={axis} index={index} paddingEnd="50vh" ref={ref}>
        {children}
    </CommonCarousel>
));
