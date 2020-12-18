import React from 'react';

import { IconProps } from '../IconRoot';

export const Info: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1-12a1 1 0 112 0v7a1 1 0 11-2 0v-7zm1-4a1 1 0 100 2 1 1 0 000-2z"
            fill="currentColor"
        />
    </svg>
);
