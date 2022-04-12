import { createContext } from 'react';

import { ScrollAxis } from './types';

export interface VirtualCarouselState {
    axis: ScrollAxis;
}

const initialValue: VirtualCarouselState = {
    axis: 'x',
};

export const VirtualCarouselContext = createContext<VirtualCarouselState>(initialValue);
