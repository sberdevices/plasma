import React from 'react';

import { IconAsset } from '../IconRoot';

export const Info: React.FC<IconAsset> = (props) => (
    <svg width="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11 16a1 1 0 112 0 1 1 0 01-2 0zm0-8a1 1 0 112 0v4a1 1 0 11-2 0V8zm.99-6C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
            fill="currentColor"
        />
    </svg>
);
