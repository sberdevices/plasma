import React from 'react';
import { Carousel } from '@sberdevices/plasma-ui';

import { ShopLandingCarouselProps } from './types';

export const ShopLandingCarouselSberPortal = React.forwardRef<HTMLDivElement, ShopLandingCarouselProps>(
    ({ index, children }, ref) => (
        <Carousel axis="x" index={index} ref={ref}>
            {children}
        </Carousel>
    ),
);
