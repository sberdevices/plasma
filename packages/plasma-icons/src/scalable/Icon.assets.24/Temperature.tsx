import React from 'react';

import { IconProps } from '../IconRoot';

export const Temperature: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 4C6 3.44772 6.44772 3 7 3H8H9H15H16H17C17.5523 3 18 3.44772 18 4C18 4.55228 17.5523 5 17 5H16V17C16 19.2091 14.2091 21 12 21C9.79086 21 8 19.2091 8 17V5H7C6.44772 5 6 4.55228 6 4ZM10 5V17C10 18.1046 10.8954 19 12 19C13.1046 19 14 18.1046 14 17V5H10ZM12 11C11.4477 11 11 11.4477 11 12V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V12C13 11.4477 12.5523 11 12 11Z"
            fill="currentColor"
        />
    </svg>
);
