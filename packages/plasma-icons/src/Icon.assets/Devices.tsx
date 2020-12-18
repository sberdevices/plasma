import React from 'react';

import { IconProps } from '../IconRoot';

export const Devices: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 4C1.343 4 0 5.363 0 7.043v8.913C0 17.637 1.343 19 3 19h1.5a.5.5 0 01.5.5A1.5 1.5 0 006.5 21H7a1 1 0 001-1v-2a1 1 0 00-1-1H3c-.525 0-1-.44-1-1.043V7.043C2 6.44 2.475 6 3 6h16c.525 0 1 .44 1 1.043V8a1 1 0 102 0v-.957C22 5.363 20.657 4 19 4H3zm9 15v-6h10v6H12zm-2-6.5a1.5 1.5 0 011.5-1.5h11a1.5 1.5 0 011.5 1.5v7a1.5 1.5 0 01-1.5 1.5h-11a1.5 1.5 0 01-1.5-1.5v-7z"
            fill="currentColor"
        />
    </svg>
);
