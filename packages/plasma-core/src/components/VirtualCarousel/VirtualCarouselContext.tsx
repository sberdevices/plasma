import { createContext } from 'react';

import { VirtualCarouselItemRefs } from './VirtualCarouselItemRefs';
import { ScrollAxis } from './types';

export interface VirtualCarouselState {
    refs?: VirtualCarouselItemRefs;
    axis: ScrollAxis;
}

const initialValue: VirtualCarouselState = {
    axis: 'x',
};

export const VirtualCarouselContext = createContext<VirtualCarouselState>(initialValue);
