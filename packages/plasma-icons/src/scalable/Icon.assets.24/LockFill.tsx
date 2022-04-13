import React from 'react';

import { IconProps } from '../IconRoot';

export const LockFill: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 10V8C16 5.79133 14.2091 4 12 4C9.79133 4 8 5.79089 8 8V10C6.89533 10 6 10.8953 6 12V18C6 19.1047 6.89533 20 8 20H16C17.1047 20 18 19.1047 18 18V12C18 10.8953 17.1047 10 16 10ZM10 8C10 6.89533 10.8956 6 12 6C13.1047 6 14 6.89556 14 8V10H10V8Z"
            fill="currentColor"
        />
    </svg>
);
