import React from 'react';

import { IconAsset } from '../IconRoot';

export const DisclosureRight: React.FC<IconAsset> = (props) => {
    if (props.width === '1rem') {
        return (
            <svg width="1rem" viewBox="0 0 17 16" fill="none" {...props}>
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.883 4.707a1 1 0 011.414-1.414L16.004 8l-4.707 4.707a1 1 0 01-1.414-1.414L13.176 8 9.883 4.707z"
                    fill="currentColor"
                    fillOpacity={0.56}
                />
            </svg>
        );
    }
    return (
        <svg width="1.5rem" viewBox="0 0 24 24" fill="none" {...props}>
            <path
                d="M9.883 8.707a1 1 0 011.414-1.414L16.004 12l-4.707 4.707a1 1 0 01-1.414-1.414L13.176 12 9.883 8.707z"
                fill="currentColor"
            />
        </svg>
    );
};
