import React from 'react';

import { IconProps } from '../IconRoot';

export const Share: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            d="M18 3.5V21M18 3.5L12 9M18 3.5L24 9"
            stroke="white"
            strokeOpacity="0.96"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <rect x="5" y="14" width="26" height="18" rx="4" stroke="white" strokeOpacity="0.96" strokeWidth="2" />
    </svg>
);
