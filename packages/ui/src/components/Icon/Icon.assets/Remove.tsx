import React from 'react';

import { IconAsset } from '../IconRoot';

export const Remove: React.FC<IconAsset> = (props) => (
    <svg width={10} height={10} viewBox="0 0 10 10" fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.707 1.707A1 1 0 008.293.293l-8 8a1 1 0 001.414 1.414l8-8z"
            fill="currentColor"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M.293 1.707A1 1 0 011.707.293l8 8a1 1 0 01-1.414 1.414l-8-8z"
            fill="currentColor"
        />
    </svg>
);
