import React from 'react';
import styled from 'styled-components';

import { CarouselContext } from './CarouselContext';

export const StyledCarouselItem = styled.div``;

export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
    as?: React.ComponentType<any>;
}

export const CarouselItem: React.FC<ListItemProps> = ({ children, ...rest }) => {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const ctx = React.useContext(CarouselContext);

    React.useEffect(() => {
        ctx.register(ref);

        return () => ctx.unregister(ref);
    }, [ctx]);

    return (
        <StyledCarouselItem ref={ref} {...rest}>
            {children}
        </StyledCarouselItem>
    );
};
