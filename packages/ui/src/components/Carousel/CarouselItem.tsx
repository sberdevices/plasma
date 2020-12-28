import React from 'react';

import { useCarouselItem } from './Carousel.hooks';

export interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: React.ComponentType<object>;
}

export const CarouselItem: React.FC<CarouselItemProps> = ({ children, ...rest }) => {
    const itemRef = useCarouselItem<HTMLDivElement>();

    return (
        <div ref={itemRef} {...rest}>
            {children}
        </div>
    );
};
