import React from 'react';

import { IconProps } from '../IconRoot';

export const AvatarCircle: React.FC<IconProps> = (props) => (
    <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM5.53626 17.5202C6.41179 16.2664 8.08083 15.3749 9.74988 15.3749H14.2499C15.919 15.3749 17.5881 16.2664 18.4636 17.5204C19.7333 16.0352 20.5 14.1071 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.107 4.26667 16.035 5.53626 17.5202ZM15 10V11C15 12.6667 13.6667 14 12 14C10.3333 14 9 12.3333 9 11V10C9 8.33333 10.3333 7 12 7C13.6667 7 15 8.33333 15 10Z"
            fill="currentColor"
        />
    </svg>
);
