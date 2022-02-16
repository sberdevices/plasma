import React, { useCallback } from 'react';

import { VirtualSmoothScroll } from './VirtualSmoothScroll';

export const VirtualHorizontalOverscan = () => {
    return (
        <VirtualSmoothScroll
            overscan={4}
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
