import React from 'react';

import { IconProps } from '../IconRoot';

export const Rotate90: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect
            x="15.9434"
            y="12"
            width="4"
            height="8"
            stroke="white"
            strokeOpacity="0.96"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M8.94336 20H12.9434V12H8.94336V16H12.4434"
            stroke="white"
            strokeOpacity="0.96"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <rect x="21.9434" y="11" width="2" height="2" rx="1" fill="currentColor" />
        <path
            d="M4.94336 19.1414C3.092 17.3265 1.94336 14.7974 1.94336 12C1.94336 6.47715 6.42051 2 11.9434 2C15.8476 2 19.2293 4.23742 20.8761 7.5"
            stroke="white"
            strokeOpacity="0.96"
            strokeWidth="1.75"
            strokeLinecap="round"
        />
        <path
            d="M21.4434 4V7.5H17.9434"
            stroke="white"
            strokeOpacity="0.96"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
