import React from 'react';

import { IconProps } from '../IconRoot';

export const CalendarEvent: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 2C6 1.44772 6.44772 1 7 1C7.55228 1 8 1.44772 8 2V3H16V2C16 1.44772 16.4477 1 17 1C17.5523 1 18 1.44772 18 2V3H19C20.6569 3 22 4.34315 22 6V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V6C2 4.34315 3.34315 3 5 3H6V2ZM4 19V8H20V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19ZM6.3 13C6.13431 13 6 13.1343 6 13.3V17.7C6 17.8657 6.13432 18 6.3 18H10.7C10.8657 18 11 17.8657 11 17.7V13.3C11 13.1343 10.8657 13 10.7 13H6.3Z"
            fill="currentColor"
        />
    </svg>
);
