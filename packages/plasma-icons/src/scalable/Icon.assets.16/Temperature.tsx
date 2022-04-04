import React from 'react';

import { IconProps } from '../IconRoot';

export const Temperature: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 2C2 1.44772 2.44772 1 3 1H4H12H13C13.5523 1 14 1.44772 14 2C14 2.55228 13.5523 3 13 3H12V11C12 13.2091 10.2091 15 8 15C5.79086 15 4 13.2091 4 11V3H3C2.44772 3 2 2.55228 2 2ZM6 3H10V11C10 12.1046 9.10457 13 8 13C6.89543 13 6 12.1046 6 11V3ZM9 8C9 7.44772 8.55228 7 8 7C7.44772 7 7 7.44772 7 8V11C7 11.5523 7.44772 12 8 12C8.55228 12 9 11.5523 9 11V8Z"
            fill="currentColor"
        />
    </svg>
);
