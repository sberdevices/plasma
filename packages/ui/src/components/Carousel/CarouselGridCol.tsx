import React from 'react';

import { Col, ColProps } from '../Grid/Grid';

import { CarouselContext } from './CarouselContext';

export const CarouselGridCol: React.FC<ColProps> = ({ children, ...rest }) => {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const ctx = React.useContext(CarouselContext);

    React.useEffect(() => {
        ctx.register(ref);

        return () => ctx.unregister(ref);
    }, [ctx]);

    return (
        <Col ref={ref} {...rest}>
            {children}
        </Col>
    );
};
