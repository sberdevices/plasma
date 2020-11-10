import React from 'react';

import { IconAsset } from '../IconRoot';

export const ChevronDown: React.FC<IconAsset> = (props) => (
    <svg width="1rem" viewBox="0 0 16 16" fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.293 5.293a1 1 0 011.414 0l2.586 2.586a1 1 0 001.414 0l2.586-2.586a1 1 0 111.414 1.414l-2.586 2.586a3 3 0 01-4.242 0L3.293 6.707a1 1 0 010-1.414z"
            fill="currentColor"
        />
    </svg>
);
