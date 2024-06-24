import React from 'react';

import { IconProps } from '../IconRoot';

export const BatteryCharge: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4 3H6V2H10V3H12V14H4V3Z" stroke="white" strokeOpacity="0.96" strokeWidth="2" strokeLinejoin="round" />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.2081 9.02227C6.03914 9.02227 5.94085 8.73291 6.03906 8.5973L8.36022 5.97514C8.48576 5.80179 8.76283 5.90906 8.7353 6.12034L8.13469 7.80923H9.79668C9.96565 7.80923 10.058 8.09878 9.95983 8.23439L7.60597 10.8566C7.48044 11.0299 7.20338 10.9227 7.23089 10.7114L7.8506 9.02227H6.2081Z"
            fill="currentColor"
        />
    </svg>
);
