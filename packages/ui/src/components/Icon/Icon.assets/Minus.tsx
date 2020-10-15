import React from 'react';

import { IconAsset } from '../IconRoot';

export const Minus: React.FC<IconAsset> = (props) => (
    <svg width={24} height={4} viewBox="0 0 24 4" fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 2a2 2 0 012-2h20a2 2 0 110 4H2a2 2 0 01-2-2z"
            fill="currentColor"
        />
    </svg>
);
