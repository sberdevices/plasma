import React, { useCallback } from 'react';

import { VirtualSmoothScroll } from './VirtualSmoothScroll';

export const VirtualSizeByIndex = () => {
    return (
        <VirtualSmoothScroll
            horizontal
            estimateSizeAndGap={useCallback(
                (i) => ({
                    size: i % 2 ? 320 : 200,
                    gap: i % 2 ? 20 : 50,
                }),
                [],
            )}
        />
    );
};
