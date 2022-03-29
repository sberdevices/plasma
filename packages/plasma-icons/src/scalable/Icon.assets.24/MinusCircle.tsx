import React from 'react';

import { IconProps } from '../IconRoot';

export const MinusCircle: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.0711 19.0709C22.9765 15.1655 22.9758 8.83339 19.0711 4.92875C15.1665 1.0241 8.83434 1.0234 4.92899 4.92875C1.02364 8.8341 1.02435 15.1662 4.92899 19.0709C8.83364 22.9755 15.1658 22.9762 19.0711 19.0709ZM6.5 11C5.94772 11 5.5 11.4477 5.5 12C5.5 12.5523 5.94772 13 6.5 13H17.5C18.0523 13 18.5 12.5523 18.5 12C18.5 11.4477 18.0523 11 17.5 11H6.5Z"
            fill="currentColor"
        />
    </svg>
);
