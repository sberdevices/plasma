import React from 'react';

import { IconProps } from '../IconRoot';

export const CalendarFill: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 1C6.44772 1 6 1.44772 6 2V3H5C3.34315 3 2 4.34315 2 6V19C2 20.6569 3.34315 22 5 22H19C20.6569 22 22 20.6569 22 19V6C22 4.34315 20.6569 3 19 3H18V2C18 1.44772 17.5523 1 17 1C16.4477 1 16 1.44772 16 2V3H8V2C8 1.44772 7.55228 1 7 1ZM4 8V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V8H4Z"
            fill="currentColor"
        />
    </svg>
);
