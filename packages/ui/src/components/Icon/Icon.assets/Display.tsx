import React from 'react';

import { IconAsset } from '../IconRoot';

export const Display: React.FC<IconAsset> = (props) => (
    <svg width="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 4C2.343 4 1 5.363 1 7.043v8.913C1 17.637 2.343 19 4 19h2v.5A1.5 1.5 0 007.5 21h9a1.5 1.5 0 001.5-1.5V19h2c1.657 0 3-1.363 3-3.043V7.043C23 5.363 21.657 4 20 4H4zM3 7.043C3 6.44 3.475 6 4 6h16c.525 0 1 .44 1 1.043v8.913C21 16.56 20.525 17 20 17H4c-.525 0-1-.44-1-1.043V7.043z"
            fill="currentColor"
        />
    </svg>
);
