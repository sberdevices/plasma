import React from 'react';

import { IconProps } from '../IconRoot';

export const Add: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM9 4C9 3.44772 8.55228 3 8 3C7.44772 3 7 3.44772 7 4V7H4C3.44772 7 3 7.44772 3 8C3 8.55228 3.44772 9 4 9H7V12C7 12.5523 7.44772 13 8 13C8.55228 13 9 12.5523 9 12V9H12C12.5523 9 13 8.55228 13 8C13 7.44772 12.5523 7 12 7H9V4Z"
            fill="currentColor"
        />
    </svg>
);
