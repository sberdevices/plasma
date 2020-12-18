import React from 'react';

import { IconProps } from '../IconRoot';

export const Share: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path fill="transparent" d="M0 0h24v24H0z" />
        <path
            d="M11 19.667V15.5c-2.463 0-4.589 0-6.101 2.49-.277.455-1.028.342-1.015-.19.154-6.446 4.858-9.3 7.116-9.3V4.333c0-.879 1.053-1.33 1.69-.724l8.05 7.667a1 1 0 010 1.448l-8.05 7.667c-.637.606-1.69.155-1.69-.724z"
            fill="currentColor"
        />
    </svg>
);
