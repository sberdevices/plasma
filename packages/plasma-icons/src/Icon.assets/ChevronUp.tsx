import React from 'react';

import { IconProps } from '../IconRoot';

export const ChevronUp: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 16 16" fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.293 10.707a1 1 0 001.414 0l2.586-2.586a1 1 0 011.414 0l2.586 2.586a1 1 0 001.414-1.414l-2.586-2.586a3 3 0 00-4.242 0L3.293 9.293a1 1 0 000 1.414z"
            fill="currentColor"
        />
    </svg>
);
