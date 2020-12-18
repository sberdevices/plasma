import React from 'react';

import { IconProps } from '../IconRoot';

export const DisclosureRight: React.FC<IconProps> = (props) => {
    if (props.size === 'xs') {
        return (
            <svg width="100%" viewBox="0 0 17 16" fill="none" {...props}>
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
        <svg width="100%" viewBox="0 0 24 24" fill="none" {...props}>
            <path
                d="M9.883 8.707a1 1 0 011.414-1.414L16.004 12l-4.707 4.707a1 1 0 01-1.414-1.414L13.176 12 9.883 8.707z"
                fill="currentColor"
            />
        </svg>
    );
};
