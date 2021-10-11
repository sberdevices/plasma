import React from 'react';

import { useMount } from './useMount';

export const useDelayedActivation = (delay = 150): boolean => {
    const [activated, setActivated] = React.useState(false);

    useMount(() => {
        const timer = setTimeout(() => {
            setActivated(true);
        }, delay);

        return () => clearTimeout(timer);
    });

    return activated;
};
