import React from 'react';

import { IconAsset } from '../IconRoot';

export const Card: React.FC<IconAsset> = (props) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.667 18.667H5.333a2 2 0 01-2-2V8a2 2 0 012-2h13.334a2 2 0 012 2v8.667a2 2 0 01-2 2zM6 10.667h12V9.333H6v1.334z"
            fill="currentColor"
        />
    </svg>
);
