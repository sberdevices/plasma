import React from 'react';

export const useWindowInnerHeight = (): number | null => {
    const [height, setHeight] = React.useState<number | null>(null);

    React.useEffect(() => {
        const setHeightHandler = () => {
            setHeight(window.innerHeight);
        };

        setHeightHandler();

        window.addEventListener('resize', setHeightHandler);
        return () => window.removeEventListener('resize', setHeightHandler);
    }, []);

    return height;
};
