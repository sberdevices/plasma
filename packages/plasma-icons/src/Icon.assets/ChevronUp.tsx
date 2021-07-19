import React from 'react';

import { IconProps } from '../IconRoot';

export const ChevronUp: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.644 16.651a1.235 1.235 0 01-1.72 0L12 9.874l-6.924 6.777a1.235 1.235 0 01-1.72 0 1.173 1.173 0 010-1.683l7.784-7.62A1.23 1.23 0 0112 7c.322 0 .632.125.86.349l7.784 7.619a1.173 1.173 0 010 1.683z"
            fill="currentColor"
        />
    </svg>
);
