import React from 'react';

import { IconProps } from '../IconRoot';

export const Battery60: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M4 3H6V2H10V3H12V14H4V3Z" stroke="white" strokeOpacity="0.96" strokeWidth="2" strokeLinejoin="round" />
        <rect x="6" y="8" width="4" height="4" rx="0.5" fill="currentColor" />
    </svg>
);
