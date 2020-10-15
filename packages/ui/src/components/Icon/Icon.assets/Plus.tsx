import React from 'react';

import { IconAsset } from '../IconRoot';

export const Plus: React.FC<IconAsset> = (props) => (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14 2a2 2 0 10-4 0v8H2a2 2 0 000 4h8v8a2 2 0 104 0v-8h8a2 2 0 100-4h-8V2z"
            fill="currentColor"
        />
    </svg>
);
