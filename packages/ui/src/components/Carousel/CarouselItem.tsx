import React from 'react';

import { CarouselContext } from './CarouselContext';

export interface ListItemProps {
    style?: React.CSSProperties;
    className?: string;

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
        <div ref={ref} {...rest}>
            {children}
        </div>
    );
};
