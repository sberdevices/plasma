import React from 'react';

export const useWindowInnerWidth = (): number | null => {
    const [width, setWidth] = React.useState<number | null>(null);

    React.useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const setWidthHandler = () => {
            setWidth(window.innerWidth);
        };

        setWidthHandler();

        window.addEventListener('resize', setWidthHandler);
        return () => window.removeEventListener('resize', setWidthHandler);
    }, []);

    return width;
};
