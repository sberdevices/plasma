import React from 'react';

import { IconProps } from '../IconRoot';

export const BatteryEmpty: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            d="M15.25 4C15.25 4.41421 15.5858 4.75 16 4.75H17C17.6904 4.75 18.25 5.30964 18.25 6V20C18.25 20.6904 17.6904 21.25 17 21.25H7C6.30964 21.25 5.75 20.6904 5.75 20V6C5.75 5.30964 6.30964 4.75 7 4.75H8C8.41421 4.75 8.75 4.41421 8.75 4V3C8.75 2.86193 8.86193 2.75 9 2.75H15C15.1381 2.75 15.25 2.86193 15.25 3V4Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
        />
    </svg>
);
