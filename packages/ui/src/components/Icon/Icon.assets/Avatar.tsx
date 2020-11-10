import React from 'react';

import { IconAsset } from '../IconRoot';

export const Avatar: React.FC<IconAsset> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 12a8 8 0 1114.147 5.12c-.926-1.039-2.412-1.745-3.897-1.745h-4.5c-1.486 0-2.971.706-3.897 1.745A7.968 7.968 0 014 12zm8-10C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3 8v1c0 1.667-1.333 3-3 3s-3-1.667-3-3v-1c0-1.667 1.333-3 3-3s3 1.333 3 3z"
            fill="currentColor"
        />
    </svg>
);
