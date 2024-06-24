import React from 'react';

import { IconProps } from '../IconRoot';

export const Fullscreen: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            d="M8 4H4V8"
            stroke="white"
            strokeOpacity="0.96"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M8 20H4V16"
            stroke="white"
            strokeOpacity="0.96"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M20 8L20 4L16 4"
            stroke="white"
            strokeOpacity="0.96"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M20 16L20 20L16 20"
            stroke="white"
            strokeOpacity="0.96"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
