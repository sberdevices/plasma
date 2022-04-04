import React from 'react';

import { IconProps } from '../IconRoot';

export const DoorClosed: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <ellipse cx="9" cy="8.33301" rx="1" ry="1" fill="currentColor" />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 2C3 1.44772 3.44772 1 4 1H12C12.5523 1 13 1.44772 13 2V14C13 14.5523 12.5523 15 12 15H4C3.44772 15 3 14.5523 3 14V2ZM5 3V13H11V3H5Z"
            fill="currentColor"
        />
    </svg>
);
