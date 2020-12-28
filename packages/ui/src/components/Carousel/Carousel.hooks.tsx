import React from 'react';

import { CarouselContext } from './CarouselContext';

export const useCarouselContext = () => React.useContext(CarouselContext);

export function useCarouselItem<T extends HTMLElement | null>() {
    const innerRef = React.useRef<T>(null);
    const { refs } = useCarouselContext();

    React.useEffect(() => {
        refs?.register(innerRef);
        return () => refs?.unregister(innerRef);
    }, [refs]);

    return innerRef;
}
