import React from 'react';

import { IconProps } from '../IconRoot';

export const DoorOpen: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.5147 4H17V19H16V21H18C18.5523 21 19 20.5523 19 20V3C19 2.44772 18.5523 2 18 2H6C5.79915 2.00002 5.60004 2.06053 5.43041 2.17808C5.16083 2.3649 5 2.67203 5 3.00001V20C5 20.4169 5.25857 20.79 5.64888 20.9363L13.6489 23.9363C13.956 24.0515 14.3 24.0087 14.5696 23.8219C14.8392 23.6351 15 23.328 15 23V6.00001C15 5.58316 14.7414 5.21004 14.3511 5.06368L11.5147 4ZM7 19.307V4.44301L13 6.69301V21.557L7 19.307Z"
            fill="currentColor"
        />
        <ellipse cx="11" cy="14.5" rx="1" ry="1.5" fill="currentColor" />
    </svg>
);
