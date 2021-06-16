import React from 'react';

export const useDelayedActivation = (delay = 150, cb?: () => void): boolean => {
    const [activated, setActivated] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setActivated(true);
            cb?.();
        }, delay);

        return () => clearTimeout(timer);
    }, [delay, cb]);

    return activated;
};
