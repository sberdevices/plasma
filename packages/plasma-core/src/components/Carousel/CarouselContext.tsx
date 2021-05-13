import { createContext } from 'react';

import { CarouselItemRefs } from './CarouselItemRefs';
import { ScrollAxis } from './types';

export interface CarouselState {
    refs?: CarouselItemRefs;
    axis: ScrollAxis;
}

const initialValue: CarouselState = {
    axis: 'x',
};

export const CarouselContext = createContext<CarouselState>(initialValue);
