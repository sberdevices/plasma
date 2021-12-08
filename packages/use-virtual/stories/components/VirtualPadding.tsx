import React, { useCallback } from 'react';

import { VirtualSmoothScroll } from './VirtualSmoothScroll';

export const VirtualPadding = () => {
    return (
        <VirtualSmoothScroll
            horizontal
            paddingStart={100}
            paddingEnd={200}
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
