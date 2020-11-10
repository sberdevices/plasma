import React from 'react';

import { IconAsset } from '../IconRoot';

export const Plus: React.FC<IconAsset> = (props) => (
    <svg width="1.5rem" viewBox="0 0 24 24" fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 3a1 1 0 00-1 1v7H4a1 1 0 100 2h7v7a1 1 0 102 0v-7h7a1 1 0 100-2h-7V4a1 1 0 00-1-1z"
            fill="currentColor"
        />
    </svg>
);
