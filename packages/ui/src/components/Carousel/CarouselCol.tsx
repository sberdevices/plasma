import React from 'react';

import { Col, ColProps } from '../Grid';

import { useCarouselItem } from './Carousel.hooks';
import { CarouselItemProps } from './CarouselItem';

export interface CarouselColProps extends ColProps, CarouselItemProps, React.HTMLAttributes<HTMLDivElement> {}

export const CarouselCol: React.FC<CarouselColProps> = ({ children, ...rest }) => {
    const itemRef = useCarouselItem<HTMLDivElement>();

    return (
        <Col ref={itemRef} type="calc" {...rest}>
            {children}
        </Col>
    );
};
