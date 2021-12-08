import React, { useCallback } from 'react';

import { VirtualSmoothScroll } from './VirtualSmoothScroll';

export const VirtualHorizontal = () => {
    return (
        <VirtualSmoothScroll
            horizontal
            estimateSizeAndGap={useCallback(
                () => ({
                    size: 320,
                    gap: 30,
                }),
                [],
            )}
        />
    );
};
