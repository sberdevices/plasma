import React from 'react';

import { IconProps } from '../IconRoot';

export const Cam: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.8889 5H20C21.1027 5 22 5.89733 22 7V17C22 18.1027 21.1027 19 20 19H4C2.89733 19 2 18.1027 2 17V7C2 5.89733 2.89733 5 4 5H7.11111C7.42044 5 7.93844 4.78533 8.15711 4.56689L8.9 3.824C9.36978 3.35422 10.2247 3 10.8889 3H13.1111C13.7753 3 14.6302 3.35422 15.0998 3.82378L15.8427 4.56667C16.0616 4.78533 16.5796 5 16.8889 5ZM12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
            fill="currentColor"
        />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
);
