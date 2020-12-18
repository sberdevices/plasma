import React from 'react';

import { IconProps } from '../IconRoot';

export const MicNone: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13 11c0 .555-.445 1-1 1-.555 0-1-.445-1-1V5c0-.555.445-1 1-1 .555 0 1 .445 1 1v6zm-1 3c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm4.93-2.15c.08-.49.49-.85.98-.85.61 0 1.1.54 1 1.14-.49 3-2.89 5.35-5.91 5.78V20c0 .55-.45 1-1 1s-1-.45-1-1v-2.08a6.993 6.993 0 01-5.91-5.78c-.09-.6.39-1.14 1-1.14.49 0 .9.36.98.85C7.48 14.2 9.53 16 12 16c2.47 0 4.52-1.8 4.93-4.15z"
            fill="currentColor"
        />
    </svg>
);
