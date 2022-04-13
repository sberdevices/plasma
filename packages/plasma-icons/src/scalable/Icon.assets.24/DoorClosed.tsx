import React from 'react';

import { IconProps } from '../IconRoot';

export const DoorClosed: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 3C5 2.44772 5.44772 2 6 2H18C18.5523 2 19 2.44772 19 3V21C19 21.5523 18.5523 22 18 22H6C5.44772 22 5 21.5523 5 21V3ZM6.5 3.5V20.5H17.5V3.5H6.5Z"
            fill="currentColor"
        />
        <path
            d="M15 12.5C15 13.3284 14.3284 14 13.5 14C12.6716 14 12 13.3284 12 12.5C12 11.6716 12.6716 11 13.5 11C14.3284 11 15 11.6716 15 12.5Z"
            fill="currentColor"
        />
    </svg>
);
