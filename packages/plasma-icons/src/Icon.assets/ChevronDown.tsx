import React from 'react';

import { IconProps } from '../IconRoot';

export const ChevronDown: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.356 7.349a1.235 1.235 0 011.72 0L12 14.126l6.924-6.777a1.235 1.235 0 011.72 0 1.173 1.173 0 010 1.683l-7.784 7.62A1.23 1.23 0 0112 17a1.23 1.23 0 01-.86-.349L3.356 9.032a1.173 1.173 0 010-1.683z"
            fill="currentColor"
        />
    </svg>
);
