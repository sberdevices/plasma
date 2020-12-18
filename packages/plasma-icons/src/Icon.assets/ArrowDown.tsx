import React from 'react';

import { IconProps } from '../IconRoot';

export const ArrowDown: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11 5v11.17l-4.88-4.88c-.39-.39-1.03-.39-1.42 0a.996.996 0 000 1.41l6.59 6.59c.39.39 1.02.39 1.41 0l6.59-6.59a.996.996 0 10-1.41-1.41L13 16.17V5c0-.55-.45-1-1-1s-1 .45-1 1z"
            fill="currentColor"
        />
    </svg>
);
