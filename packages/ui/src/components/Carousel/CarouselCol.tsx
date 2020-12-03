import React from 'react';
import styled from 'styled-components';

import { Col, ColProps } from '../Grid';

import { CarouselContext } from './CarouselContext';

export const StyledCarouselCol = styled(Col)``;

export const CarouselCol: React.FC<ColProps> = ({ children, ...rest }) => {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const ctx = React.useContext(CarouselContext);

    React.useEffect(() => {
        ctx.register(ref);

        return () => ctx.unregister(ref);
    }, [ctx]);

    return (
        <StyledCarouselCol ref={ref} type="calc" {...rest}>
            {children}
        </StyledCarouselCol>
    );
};
