import React from 'react';

import { IconAsset } from '../IconRoot';

export const BellActive: React.FC<IconAsset> = (props) => (
    <svg width="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.95 2.068a1.481 1.481 0 00-1.931 1.415v.672c-2.839.673-4.45 3.204-4.45 6.25v4.943l-1.276 1.276c-.623.623-.188 1.69.692 1.69h13.022c.88 0 1.325-1.067.702-1.69l-1.275-1.276v-4.944c0-.204-.008-.406-.022-.606a5 5 0 01-5.463-7.73zm1.529 17.235a1.977 1.977 0 11-3.955 0h3.955z"
            fill="currentColor"
        />
        <circle cx={16} cy={5} r={3} fill="#DC283A" />
    </svg>
);
