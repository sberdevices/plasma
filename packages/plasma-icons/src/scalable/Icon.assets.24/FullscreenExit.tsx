import React from 'react';

import { IconProps } from '../IconRoot';

export const FullscreenExit: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            d="M4 8L8 8L8 4"
            stroke="white"
            strokeOpacity="0.96"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M4 16L8 16L8 20"
            stroke="white"
            strokeOpacity="0.96"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M16 4L16 8L20 8"
            stroke="white"
            strokeOpacity="0.96"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M16 20L16 16L20 16"
            stroke="white"
            strokeOpacity="0.96"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
