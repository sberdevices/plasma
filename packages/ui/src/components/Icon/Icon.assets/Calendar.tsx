import React from 'react';

import { IconAsset } from '../IconRoot';

export const Calendar: React.FC<IconAsset> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 1a1 1 0 00-1 1v1H5a3 3 0 00-3 3v13a3 3 0 003 3h14a3 3 0 003-3V6a3 3 0 00-3-3h-1V2a1 1 0 10-2 0v1H8V2a1 1 0 00-1-1zM4 8v11a1 1 0 001 1h14a1 1 0 001-1V8H4z"
            fill="currentColor"
        />
    </svg>
);
