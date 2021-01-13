import React from 'react';
import styled from 'styled-components';

import { Col, ColProps } from '../Grid';

import { useCarouselItem } from './Carousel.hooks';
import { CarouselItemProps, applyScrollSnap } from './CarouselItem';

const StyledCol = styled(Col)<Pick<CarouselItemProps, 'scrollSnapAlign'>>`
    ${applyScrollSnap};
`;

export interface CarouselColProps extends ColProps, CarouselItemProps, React.HTMLAttributes<HTMLDivElement> {}

export const CarouselCol: React.FC<CarouselColProps> = ({ children, ...rest }) => {
    const itemRef = useCarouselItem<HTMLDivElement>();

    return (
        <StyledCol ref={itemRef} type="calc" {...rest}>
            {children}
        </StyledCol>
    );
};
