import React from 'react';

import { IconProps } from '../IconRoot';

export const RedCrossOutline: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13 13V8.021C13 6.90715 13.882 6 15 6H21C22.1153 6 23 6.88472 23 8V13H28C29.1153 13 30 13.8847 30 15V21C30 22.1153 29.1153 23 28 23H23V27.979C23 29.0929 22.118 30 21 30H15C13.882 30 13 29.0929 13 27.979V23H8C6.88472 23 6 22.1153 6 21V15C6 13.8847 6.88472 13 8 13H13ZM15 8V14C15 14.5523 14.5523 15 14 15H8V21H14C14.5523 21 15 21.4477 15 22L14.9997 27.9994L21 28V22C21 21.4477 21.4477 21 22 21H28V15H22C21.4477 15 21 14.5523 21 14V8H15Z"
            fill="currentColor"
        />
    </svg>
);
